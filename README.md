# **Header Groups**

> A [SinusBot] script that will automatically assign or remove header groups if at least one of the corresponding trigger groups is assigned or all are removed.


[![forthebadge](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)][Marketplace]
[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)][Marketplace]
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)][Marketplace]

- [Discord]
- [Sinusbot Resource Page][Marketplace]

---

<br>

<!-- Table of Contents -->
<details>
    <summary>
        <strong>Table of Contents (click to expand)</strong>
    </summary>

- [**Header Groups**](#header-groups)
  - [**📑 Overview**](#-overview)
  - [**🔧 Installation**](#-installation)
  - [**📕 History**](#-history)
  - [**⏰ Changelog**](#-changelog)
  - [**🎓 License**](#-license)
</details>


## **📑 Overview**
This is a script for the [SinusBot]. It will automatically assign header groups to users if at least one of the respective trigger groups was assigned.

It also has the ability to remove the header groups when the user has no more trigger groups.

The script listens to events. Everytime a servergroup is assigned or removed, it will automatically detect if a header group has to be assigned or removed.

It also has an option to listen to logins. Everytime the bot logs in, restarts or a user joins the [TeamSpeak] server, it will check if any header group needs to be assigned or removed.


## **🔧 Installation**

1. Download the latest **js-file** from the [releases].
2. Drop it in the scripts folder of your [SinusBot].
3. Start/Restart the bot.
4. Navigate to the script settings.
5. Configure it to your liking (we recommend using [this guide][configuration]), activate and save it and then restart the bot instance.


## **📕 History**
I like to have my [TeamSpeak] server clean and with a great overview.

Therefor, I decided to separate my serversgroups with header groups. My Admins, Moderators, Supports and Trials have the header group `### Staff ###` for example.

As it looks a lot nicer in someone's group overview if the it's also separated, I wanted to give these header groups to users too. But it was kinda annoying doing that manually every single time someone gets a new group.

It was time to automate it and here's the script for that!


## **⏰ Changelog**
Everything related to versions and their release notes can be found in the [changelog].


## **🎓 License**
This project is licensed under the [MIT License].


<!-- Links -->
[SinusBot]: https://www.sinusbot.com/
[Discord]: https://discordapp.com/invite/Q3qxws6
[Marketplace]: https://forum.sinusbot.com/resources/automated-header-groups.412/
[TeamSpeak]:https://www.teamspeak.com/
[releases]: https://github.com/RLNT/sinus-header-groups/releases
[configuration]: CONFIGURATION.md
[changelog]: CHANGELOG.md
[MIT License]: LICENSE.md
