
export const users = [
    {
        avatar: "https://picsum.photos/id/152/256/256",
        name: "Daniel Bulant",
        school: "SSPŠ 1.K",
        extended: "Student Smíchovské Střední Průmyslové Školy, full-stack developer.",
        tags: ["developer", "fullstack", "web", "discord-bots"],
        instagram: "danbulant",
        discord: "TechmandanCZ"
    },
    {
        avatar: "https://picsum.photos/id/182/256/256",
        name: "Vojtěch Jungman",
        school: "SSPŠ 3.K",
        extended: "Prestiž",
        tags: ["developer", "backend", "PR"]
    }, {
        avatar: "https://picsum.photos/id/282/256/256",
        name: "Bruno Bartůněk",
        school: "SSPŠ 1.K",
        extended: "Arduino man",
        instagram: "bruno_bartunek",
        tags: ["developer", "arduino"]
    }
];

export const projects = [{
    authors: ["Daniel Bulant"],
    name: "Domovská stránka",
    desc: "Moje vlastní webová stránka",
    tags: ["web"],
    links: ["https://danbulant.eu"],
    state: "finished"
}, {
    authors: ["Daniel Bulant", "Bruno Bartůněk", "Vojtěch Jungman"],
    name: "Conwo",
    desc: "Conwo, profesní síť, projekt pro DigiEduHack 2021",
    state: "ongoing",
    tags: ["web"],
    links: []
}, {
    authors: ["Daniel Bulant"],
    name: "Igni",
    desc: "Igni discord bot",
    state: "ongoing",
    tags: ["discord_bot"],
    links: ["https://danbulant.eu"]
}];

export var projectTags = {
    web: "Web",
    discord_bot: "Discord bot"
};

export var tags = {
    developer: {
        name: "Developer"
    },
    fullstack: {
        name: "Full-stack",
        dep: "developer"
    },
    frontend: {
        name: "Front-end",
        dep: "developer"
    },
    backend: {
        name: "Back-end",
        dep: "developer"
    },
    arduino: {
        name: "Arduino",
        dep: "developer"
    },
    web: {
        name: "Web",
        dep: "developer"
    },
    "discord-bots": {
        name: "Discord bots",
        dep: "developer"
    },
    PR: {
        name: "PR"
    },
    reklama: {
        name: "Ads",
        dep: "PR"
    },
    art: {
        name: "Art"
    },
    designer: {
        name: "Designer",
        dep: "art"
    },
    music: {
        name: "Music",
        dep: "art"
    },
    artist: {
        name: "Artist",
        dep: "art"
    },
    eco: {
        name: "Eco"
    },
    trash: {
        name: "Sbírání odpadků",
        dep: "eco"
    }
};