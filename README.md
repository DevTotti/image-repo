# Image Repository

This Image repository enables users to signup, upload images and delete images. The users' addition to the repository can either be made public or private depending on the users' choice.

## Installation

Ensure you have the following software installed on your machine -- node, express. Also, you need to install the dependencies and modules used in this project.

## Modules Installation

Run
```bash
npm install
``` 
to install all the modules in the ``` package.json ``` file.


## How to run the file
### Use the second command if you have nodemon installed
```bash
node app.js
nodemon app.js
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Routes
NAME     			     | END POINT            |  PARAMS / BODY DATA
-------------------------| -------------        | ---------------
User Signup [POST]    	 | /users/signup        |{`username`,`email`,`password`}
User Signin [POST] 	     | /users/signin        |{`email`,`password`}
Upload image(s) [POST]   | /upload              |formdata {`image(s)`, `token (from signin)`, `visibility (optional)(1 for public & 0 for private default set to 1)`}
Delete image(s) [POST]     | /delete            |{`token (from signin)`, `id:array`}
Delete single image [GET]     | /delete/:id        |params:`id` body: `token (from signin)`

## Author
Paul Adediran