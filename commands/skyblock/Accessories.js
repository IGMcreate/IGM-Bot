const { default: axios } = require('axios');
const { ApplicationCommandOptionType} = require('discord.js');
const  nbt  = require('prismarine-nbt');
const  fs  = require('fs');
const {unzip} = require('node:zlib');

module.exports = {
    name: 'accessories',
    description: "returns players accessories for the selected profile",
    options: [
        {
            name: 'player',
            description: "player whose profile's accessories are to be displayed",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'profile',
            description: 'profile to be displayed',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async execute({inter, client}) {
        const player = inter.options.getString('player');
        const profile = (inter.options.getString('profile')).toLowerCase();

        const hypixel_key = client.config.app.hypixel_api_token

        function axiosUUID() {
            const promise = axios.get(`https://api.mojang.com/users/profiles/minecraft/${player}`)

            const dataPromise = promise.then((res) => res.data.id)

            return dataPromise
        }

        axiosUUID()
        .then(data => {
            axios({
                method: 'get',
                url: `https://api.hypixel.net/v2/skyblock/profiles?key=${hypixel_key}&uuid=${data}`,
            })
            //.get(`https://api.hypixel.net/v2/skyblock/profiles?key=${hypixel_key}&uuid=${data}`)
                .then((res) => {
                    const uuid = data
                    //if (res.data.auctions[0] === undefined) return inter.editReply(`No current auctions`);
                    var datas = res.data.profiles;
                    for (var i = 0; i < datas.length; i++) {
                        let type = datas[i].cute_name.toLowerCase();
                        if (type === profile) {
                            var num = i
                            //console.log(res.data.profiles[i])
                            break;
                        }                         
                    }

                    //console.log(res.data.profiles[num].members[uuid].inventory.bag_contents.talisman_bag)
                    accessory_data = res.data.profiles[num].members[uuid].inventory.bag_contents.talisman_bag.data;
                    var buffer = Buffer.from(accessory_data, 'base64');
                    unzip(buffer, (err, buffer) => {
                        if (err) {
                          console.error('An error occurred:', err);
                          process.exitCode = 1;
                        }
                        console.log(buffer.toString());
                        inter.editReply(buffer.toString().substring(0, 1999))
                      });
                   
                    //console.log(res.data.profiles)

                })
            })
            .catch(err => console.log(err))

        .catch(console.error);//might crash .exe, needs testing
    }, 
};