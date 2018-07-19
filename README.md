# Realtime-chat-x

![chat preview](https://i.imgur.com/ORyHJln.png)

Realtime chat web app using Node.js, Express.js and Socket.io

<b>Help me to improve with some pull request or open issues</b>

## Installation
### required tools 
- git installed
- node v7 or newer installed
- mongoDB installed
- yarn installed ( optional )

then install with the following commands below:

``` bash
git clone https://github.com/blubMe/realtime-chat-x.git
cd realtime-chat-x
npm install
```

for yarn user :
``` bash
git clone https://github.com/blubMe/realtime-chat-x.git
cd realtime-chat-x
yarn
```

After installation complete, rename `now.example.json` to `now.json`

then edit `now.json` and fill it, example:

```json
{
    "env": {
        "DB_URL": "mongodb://localhost:27031/realtimechat",
        "DB_NAME": "realtimechat"
    }
}
```

## Usage

After install all dependency we need, then run it :

<b><i>make sure mongodb is running and you have done create your database</i></b>

for npm user :
``` bash
npm run start
```

for yarn user :
``` bash
yarn start
```

## Contributing

If you have a better idea to improve realtime-chat-x, open issue or create pull request <3

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

Realtime-chat-x (this project) is licensed under MIT license.

