# iDIoT

iDIoT is the i of the iPhone (or the iBlitzcrank), but with IoT and Domotics.

## Usage

We host versions for your own use on our server, and have a [demo hosted version](https://web.idiot.0xf.fr).

To use it yourself, you will need to have installed:

- Docker Compose
- NodeJS

You would also need some microcontrollers with sensors to actually gather data from, but we are planning on having a demo for this that doesn't require microcontrollers.

The default values are not production safe, do not hesitate to contact us if you want to deploy a production set-up and we would be happy to assist.

All of the infrastructure can be simply started with `docker compose up -d` from the root of the repo

To get the frontend running, you will need to edit the `API_URL` on the frontend side to point to your deployment.

On windows, you will have to manually go edit the [`client.ts`](./front/src/api/client.ts) file, and on unix you can use this script.

```sh
# We replace the demo api with a local one.
sed -i "s~'https://api.idiot.0xf.fr/v1'~'http://localhost:7667/v1'~" ./front/src/api/client.ts
```

Once that's done, you just have to create yourself a user;

```sh
docker exec api ./main db user add --admin --name $MY_NAME --email $MY_EMAIL --password $MY_PASSWORD
```

Now, all the infrastructure should be ready to welcome you, and you only have to run the frontend.

```sh
cd front; npm i; npm run dev
```

The frontend should then be available at `http://localhost:5173` and you can login with your credentials

<!-- TODO(@Karitham): Prod setup -->