const ApiGateway = require('moleculer-web');
const Gun = require('gun');

module.exports = {
    name: 'api',
    mixins: [ApiGateway],

    settings: {
        port: process.env.PORT || 3000,
        ip: '192.168.0.102',

        routes: [{
            path: '/api',

            aliases: {
                'math/add': 'math.add'
            },

            // Parse body content
            bodyParsers: {
                json: {
                    strict: false
                },
                urlencoded: {
                    extended: false
                }
            }
        }, {
            path: '/gun',
            use: [
                Gun.serve
            ]
        }],

        assets: {
            folder: './public'
        },

    },

    started: function() {
        this.gun = Gun({
            file: 'data',
            web: this.server
        });
    }

};
