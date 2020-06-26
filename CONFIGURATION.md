# **Configuration Guide**

> This guide will give you a detailed information how to configure the script to your needs.

---

<br>

<!-- Table of Contents -->
<details>
    <summary>
        <strong>Table of Contents (click to expand)</strong>
    </summary>

- [**Configuration Guide**](#configuration-guide)
  - [**How does the script operate?**](#how-does-the-script-operate)
  - [**General Options**](#general-options)
  - [**Group Options**](#group-options)
</details>


## **How does the script operate?**
A good start to configure a script is to understand its functionality. Here are a few small points which are important if you want to set everything up correctly.

1. The script is listening to events so header groups are only assigned or removed if you assign or remove a group manually.
2. There also in an optional option so the script also recognizes when someone joins the server. If you activate that, the script will check if the user who joined has the right header groups for their current groups.
3. Another optional functionality is that the script checks all online users on startup/restart/script reload. In case you changed someone's groups when the bot was not online, it will do it once it's back online.
4. Group IDs you set in the config that have no valid servergroup will be ignored.
6. The script detects a lot of misconfiguration and provides standard values. Just make sure to fill out each field marked with (*).
7. If there is a severe error that affects the script's functionality, it will be written in the log and the script won't be executed.


## **General Options**
The first section is all about the general options. You configure every basic aspect of the script here.

Please click the option you want to configure to get more information.

<details>
    <summary>
        Multiple-Headers
    </summary>

*Details*:
- optional option | default value: `No`
- select `Yes` or `No`

*Info*:
- defines if multiple header groups are allowed for any trigger groups
- helpful if you have more than one header group for some trigger groups for example the trigger group `Moderator` has the header groups `Staff` and `Support`
- leave this deactivated if you only have one header group for all trigger groups to save some performance
</details>
<details>
    <summary>
        Check-On-Load
    </summary>

*Details*:
- optional option | default value: `Yes`
- select `Yes` or `No`

*Info*:
- defines if the script should verify the header groups of all currently online users of the server
- this will delete everyone's header groups if they do not have the respective trigger groups and vis versa
- this can be useful if the bot was offline during a group assignment/removal
</details>
<details>
    <summary>
        Check-On-Join
    </summary>

*Details*:
- optional option | default value: `Yes`
- select `Yes` or `No`

*Info*:
- defines if the script should verify the header groups of a client when they join the server
- this will delete a user's header groups if they do not have the respective trigger groups and vis versa
- this can be useful if the user was offline during a group assignment/removal
</details>


## **Group Options**
The second and last section is all about the groups. You can set as many groups as you want.

Please click the option you want to configure to get more information.

<details>
    <summary>
        Header-Group
    </summary>

*Details*:
- required option | default value: none
- enter the id of the group you want as header group

*Info*:
- that's the group that is automatically assigned/removed by the script, when at least one of the trigger groups was assigned/removed
- if you don't enter an id of a group or the id does not refer to a valid group, the corresponding group will be skipped and won't work
</details>
<details>
    <summary>
        Trigger-Groups
    </summary>

*Details*:
- required option | default value: none
- enter a list of group ids you want to have as trigger groups

*Info*:
- that's the pool of groups which is used to trigger the header group assignment/removal
- if you don't enter any id of a group or the ids do not refer to valid groups, the corresponding group will be skipped and won't work
</details>

---

**You are done with the configuration now!**
