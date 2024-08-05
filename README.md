
# AutomTest 3.0
Towards a Test Case Generation Tool Based on Functional Requirements.   
Article for it's first version:
https://dl.acm.org/doi/10.1145/3439961.3440002

## TO Start
First, you need Nodejs installed version 18 or above.
Then, run `npm i` in the root of this project

## Run
This application is solemly the frontend of the project. To run AutomTest 3.0, you must run the back-end in addition to this front-end.
The application back-end can be found here: <https://github.com/JoandersonG/AutomTest>
Once the back-end is set up, it's possible to run `npm start` to run the front-end as well.

## Run AutomTest 3.0's executable file
For windows, just execute the .exe to install the application inside your operating system.

In Linux, firstly you'll need to extract the .tar.gz:
`tar -xzf automtest-frontend-3.0.0.tar.gz`
Turn the file executable by running:
`chmod +x automtest-frontend-3.0.0/automtest-frontend`
And then run the file:
`./automtest-frontend-3.0.0/automtest-frontend`

## Deploy
To generate an executable, firstly run the folloing:
`npm run build`
Then to generate and .exe to run in Windows, run the folloing inside the project root:
`npx electron-builder -w`
Now for generating the program to Linux, run the following: 
`sudo apt install -y libgtk-3-0 libatk1.0-0 libgbm1`
`npx electron-builder --linux .tar.gz`

