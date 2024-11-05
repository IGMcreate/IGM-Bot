const { default: axios } = require('axios');
const { ApplicationCommandOptionType, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, Colors, ActionRowBuilder } = require('discord.js');
const { int } = require('prismarine-nbt');

module.exports = async ({ inter, client }) => {
    axios
        .get(`https://api.hypixel.net/v2/resources/skyblock/election`)
        .then(async (res) => {
            //console.log(res.data)
            if ((res.data.mayor.name).toLowerCase() == "aatrox") {
                skin = 'c1bdf505bb8c0f1f3365a03032de1931663ff71c57e022558de312b8f1b5c445'
            } else if ((res.data.mayor.name).toLowerCase() == "cole") {
                skin = '16422de08848952d1cbead66bbbad6f07191bdcc952f3d1036aeb0c22938f39b'
            } else if ((res.data.mayor.name).toLowerCase() == "diana") {
                skin = '83cc1cf672a4b2540be346ead79ac2d9ed19d95b6075bf95be0b6d0da61377be'
            } else if ((res.data.mayor.name).toLowerCase() == "diaz") {
                skin = '9cf4737cd444b590545734a6408cbe23c182f4283f167a3e3c09532ccbef17f9'
            } else if ((res.data.mayor.name).toLowerCase() == "finnegan") {
                skin = 'e7747fbee9fb39be39b00d3d483eb2f88b4bae82417ab5cb1b1aa930dd7b6689'
            } else if ((res.data.mayor.name).toLowerCase() == "foxy") {
                skin = '3485a717fa0f51d7fadc66a5d5e9853905bef914e3b2848a2f128e63d2db87'
            } else if ((res.data.mayor.name).toLowerCase() == "marina") {
                skin = '807fc9bee8d3344e840e4031a37249a4c3c87fc80cf16432cc5c2153d1f9c53d'
            } else if ((res.data.mayor.name).toLowerCase() == "paul") {
                skin = '1b59c43d8dbccfd7ec6e6394b6304b70d4ed315add0494ee77c733f41818c73a'
            } else if ((res.data.mayor.name).toLowerCase() == "jerry") {
                skin = 'https://static.wikia.nocookie.net/hypixel-skyblock/images/5/58/Villager.png/revision/latest?cb=20210805125409'
            } else if ((res.data.mayor.name).toLowerCase() == "derpy") {
                skin = 'f450d12692886c47b078a38f4d492acfe61216e2d0237ab82433409b3046b464'
            } else if ((res.data.mayor.name).toLowerCase() == "scorpius") {
                skin = '8f26fa0c47536e78e337257d898af8b1ebc87c0894503375234035ff2c7ef8f0'
            } else {
                skin = ''
            }
            //const file = new AttachmentBuilder('../Broken af/assets/discordjs.jpg');



            const MayorEmbed = new EmbedBuilder()
                .setColor('#2f3136')
                //.setURL(`https://sky.coflnet.com/player/`)
                //.setAuthor({ name: `a`, iconURL: inter.client.user.displayAvatarURL() , url: `https://namemc.com/profile/`  })
                .setTitle('Current Election')
            //if (skin != 'https://static.wikia.nocookie.net/hypixel-skyblock/images/5/58/Villager.png/revision/latest?cb=20210805125409'){
            //MayorEmbed.setThumbnail(`https://mc-heads.net/body/${skin}/left`) //get mayor skin
            //} else {
            //  MayorEmbed.setThumbnail(`https://static.wikia.nocookie.net/hypixel-skyblock/images/5/58/Villager.png/revision/latest?cb=20210805125409`)
            //}
            //.setDescription('Some description here')
            // MayorEmbed.addFields(
            //{ name: 'election', value: '' },
            //{ name: 'Skill', value: res.data.mayor.key },
            // )

            function removeCharAndRandom(str, charToRemove) {
                // Create a regular expression to match the specified character followed by any character
                const regex = new RegExp(`${charToRemove}.`, 'g');

                // Use the replace method to remove the matched substring
                return str.replace(regex, '');
            }
            try{
                for (var i = 0; i < (res.data.current.candidates).length; i++) {
                    //console.log(modifiedString)
                    var mayor_votes = res.data.current.candidates[i].votes
                    console.log(mayor_votes)
                    MayorEmbed.addFields(
                        { name: res.data.current.candidates[i].name, value: res.data.current.candidates[i].key, incline: true },
                        { name: 'Votes', value: mayor_votes.toString(), incline: true },
                    )

                    for (var j = 0; j < (res.data.current.candidates[i].perks).length; j++) {
                        const originalString = res.data.current.candidates[i].perks[j].description;
                        var modifiedString = 'It brokey'
                        if (res.data.current.candidates[i].perks[j].minister == true) {
                            modifiedString = (removeCharAndRandom(originalString, '§') + ' (minister)');
                        } else {
                            modifiedString = removeCharAndRandom(originalString, '§');
                        }
                        MayorEmbed.addFields(
                            { name: res.data.current.candidates[i].perks[j].name, value: modifiedString, inline: true },
                        )
                    }
                    MayorEmbed.addFields({ name: '\u200B', value: '\u200B' },)
                }
                //     { name: 'Perk 1', value: 'a', inline: true },
                //     { name: 'Perk 2', value: 'a', inline: true },
                //     { name: 'Perk 3', value: 'a', inline: true },
                //     { name: 'Perk 4', value: 'a', inline: true },
                //     { name: '\u200B', value: '\u200B' },
                //     { name: 'Inline field title', value: 'Some value here', inline: true },
                //     { name: 'Inline field title', value: 'Some value here', inline: true },
                // )
                //.setImage('attachment://discordjs.jpg')
                //.setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
                MayorEmbed
                    .setTimestamp()
                    .setFooter({ text: ':)', iconURL: inter.member.avatarURL({ dynamic: true }) })
                //return MayorEmbed


                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(JSON.stringify({ ffb: 'mayor_p2' }))
                            .setLabel('Go back a page')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId(JSON.stringify({ ffb: 'mayor_p3' }))
                            .setLabel('Go forward a page')
                            .setStyle(ButtonStyle.Success)
                    );

                row.components[1].setDisabled(true);

                await inter.editReply({ embeds: [MayorEmbed], components: [row], ephemeral: true });
            } catch (e) {
                console.log(e)
                MayorEmbed.addFields({name: 'Status', value: 'There is no current election'})
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(JSON.stringify({ ffb: 'mayor_p2' }))
                            .setLabel('Go back a page')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId(JSON.stringify({ ffb: 'mayor_p3' }))
                            .setLabel('Go forward a page')
                            .setStyle(ButtonStyle.Success)
                    );

                row.components[1].setDisabled(true);
                inter.editReply({ embeds: [MayorEmbed], components: [row], ephemeral: true })
            }
        })

}