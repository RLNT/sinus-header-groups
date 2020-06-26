/*
    Author: RLNT
    License: MIT
    Repository: https://github.com/RLNT/sinus-header-groups
    Resource-Page: https://forum.sinusbot.com/resources/automated-header-groups.412/
    Discord: https://discord.com/invite/Q3qxws6
*/
registerPlugin(
    {
        name: 'Header Groups',
        version: '2.0.0',
        description: 'With this script, the bot will automatically give the respective header groups if at least one of the trigger groups is assigned.',
        author: 'RLNT',
        backends: ['ts3'],
        vars: [
            {
                name: 'required',
                title: 'All fields that are marked with (*) are required!'
            },
            {
                name: 'configuration',
                title: 'A guide how to configure the script to your needs can be found here: https://github.com/RLNT/sinus-staff-list/blob/master/CONFIGURATION.md'
            },
            {
                name: 'spacer0',
                title: ''
            },
            {
                name: 'header0',
                title: '->>> General Options <<<-'
            },
            {
                name: 'multipleHeaders',
                title: 'Multiple-Headers > Do you have multiple header groups for some trigger groups?',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'checkOnLoad',
                title: 'Check-On-Load > Do you want the script to verify the header groups for all online clients when the bot starts/restarts/reloads the script?',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'checkOnJoin',
                title: 'Check-On-Join > Do you want the script to verify the header groups for a client when they join the server?',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'spacer1',
                title: ''
            },
            {
                name: 'header1',
                title: '->>> Group Setup <<<-'
            },
            {
                name: 'groups',
                title: 'Groups',
                type: 'array',
                vars: [
                    {
                        name: 'header',
                        title: 'Header-Group > Define the group id you want to have as your header group! (*)',
                        indent: 1,
                        type: 'string'
                    },
                    {
                        name: 'trigger',
                        title: 'Trigger-Groups > Define a list of group ids you want to have as your trigger groups! (*)',
                        indent: 1,
                        type: 'strings'
                    }
                ]
            }
        ]
    },
    (_, config) => {
        // DEPENDENCIES
        const engine = require('engine');
        const backend = require('backend');
        const event = require('event');

        // GLOBAL VARS
        const prefix = 'Header-Groups';

        // CONFIG OPTIONS
        const multipleHeaders = varDef(config.multipleHeaders, 1) == 0;
        const checkOnLoad = varDef(config.checkOnLoad, 0) == 0;
        const checkOnJoin = varDef(config.checkOnJoin, 0) == 0;

        // FUNCTIONS
        function log(message) {
            engine.log(prefix + ' > ' + message);
        }

        function varDef(v, defVal) {
            if (v === undefined || v === null || v === '') {
                return defVal;
            } else {
                return v;
            }
        }

        function waitForBackend() {
            return new Promise(done => {
                const timer = setInterval(() => {
                    if (backend.isConnected()) {
                        clearInterval(timer);
                        done();
                    }
                }, 1000);
            });
        }

        function validateGroups() {
            let validGroups = [];

            config.groups.forEach(group => {
                if (group.header === undefined || backend.getServerGroupByID(group.header) === undefined) return;
                if (group.trigger === undefined || group.trigger.length === 0) {
                    return;
                } else {
                    group.trigger.map(gid => backend.getServerGroupByID(gid) !== undefined);
                }

                validGroups.push(group);
            });

            return validGroups;
        }

        function getClientGroupIDs(client) {
            return Array.from(client.getServerGroups(), x => x.id());
        }

        function validateClientGroups(client, groups) {
            const clientgroups = getClientGroupIDs(client);

            for (let entry of groups) {
                // checking if client has header
                if (clientgroups.includes(entry.header)) {
                    if (!entry.trigger.some(gid => clientgroups.includes(gid))) {
                        removeServerGroup(client, entry.header);
                    }
                    // checking if client has any trigger
                } else {
                    if (entry.trigger.some(gid => clientgroups.includes(gid))) {
                        addServerGroup(client, entry.header);
                    }
                }
            }
        }

        function addServerGroup(client, gid) {
            if (!getClientGroupIDs(client).includes(gid)) {
                client.addToServerGroup(gid);
            }
        }

        function removeServerGroup(client, gid) {
            if (getClientGroupIDs(client).includes(gid)) {
                client.removeFromServerGroup(gid);
            }
        }

        // LOADING EVENT
        event.on('load', () => {
            if (config.groups === undefined || config.groups.length === 0) {
                log('There were no groups configured! Deactivating script...');
            } else {
                log('The script has loaded successfully!');

                // start the script
                waitForBackend().then(() => {
                    main();
                });
            }
        });

        // MAIN
        function main() {
            // VARIABLES
            const groups = validateGroups();
            const triggers = [
                ...new Set(
                    [].concat.apply(
                        [],
                        Array.from(groups, x => x.trigger)
                    )
                )
            ];

            // check if everyone has the right groups on load
            if (checkOnLoad) {
                backend.getClients().forEach(client => {
                    validateClientGroups(client, groups);
                });
            }

            // MOVE EVENT
            if (checkOnJoin) {
                // check if user has the right groups on join
                event.on('clientMove', event => {
                    if (event.fromChannel == undefined) {
                        validateClientGroups(event.client, groups);
                    }
                });
            }

            // SERVER GROUP ADDED EVENT
            event.on('serverGroupAdded', event => {
                const group = event.serverGroup;
                if (!triggers.includes(group.id())) return;
                const client = event.client;

                for (let entry of groups) {
                    if (entry.trigger.includes(group.id())) {
                        addServerGroup(client, entry.header);
                        if (!multipleHeaders) return;
                    }
                }
            });

            // SERVER GROUP REMOVED EVENT
            event.on('serverGroupRemoved', event => {
                const group = event.serverGroup;
                if (!triggers.includes(group.id())) return;
                const client = event.client;

                for (let entry of groups) {
                    if (entry.trigger.includes(group.id())) {
                        if (!entry.trigger.some(gid => getClientGroupIDs(client).includes(gid))) removeServerGroup(client, entry.header);
                        if (!multipleHeaders) return;
                    }
                }
            });
        }
    }
);
