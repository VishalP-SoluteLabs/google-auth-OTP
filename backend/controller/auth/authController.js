const User = require("../../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const otpGenerator = require('otp-generator')

const generateOTP = () => {
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets: false });
};

const sendMail = async (toEmail, OTP, name) => {
    const MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Bacancy Technologies LLP',
            link: 'https://www.bacancytechnology.com'
        }
    });

    const response = {
        body: {
            name: `${name}`,
            intro: 'Hi, Your One-Time Password, it will be valid for 5 min',
            table: {
                data: [
                    {
                        OTP: `${OTP}`
                    }
                ]
            },
            outro: 'Looking forward to do more business with you...!!😀'
        }
    };

    const mail = MailGenerator.generate(response);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PWD
        }
    });

    const message = {
        from: process.env.ADMIN_EMAIL,
        to: toEmail,
        subject: "Your One-Time Passcode from Bacancy Technologies LLP",
        html: mail
    };

    await transporter.sendMail(message);
};

exports.postSignup = async (req, res, next) => {
        const { email, password, name } = req.body;
        
        const otp = generateOTP()

        const existingUser = await User.findOne({
            where: { email: email }
        });

        if (existingUser) {
            const error = new Error('User with this email already exists!');
            error.statusCode = 409;
            throw error;
        }

    const hashedPwd = await bcrypt.hash(password, 12);
    const hashedOtp = await bcrypt.hash(otp, 12)

        const user = User.build({
            name: name,
            email: email,
            password: hashedPwd,
            otp: hashedOtp,
            isVerified: false
        });
    
    await user.save();
    await sendMail(email, otp, name)

        res.status(201).json({
            message: 'OTP sent for verification',
            email: email
        });
};

exports.postLogin = async (req, res, next) => {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            const error = new Error('User not found!');
            error.statusCode = 404;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            const error = new Error(`The password doesn't match!`);
            error.statusCode = 401;
            throw error;
        }

        const accessToken = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        });

        res.status(200).json({
            message: 'Logged In successfully!',
            userId: user.id,
            email: user.email,
            accessToken: accessToken
        });
};


exports.verifyOTP = async (req, res, next) => {
    const { email, receivedOtp } = req.body;

    // const otp = await bcrypt.hash(receivedOtp, 12)

    // const user = await User.findOne({ where: { email: email, otp: otp } });

    // if(!user){
    //     const error = new Error(`OTP doesn't match!`);
    //     error.statusCode = 401;
    //     throw error;
    // }
    
    const user = await User.findOne({ where: { email } });

    if (!user) {
        const error = new Error('User Not Found!')
        error.statusCode = 404;
        throw error;
    }

    const isOtpValid = await bcrypt.compare(receivedOtp, user.otp);

    if (!isOtpValid) {
        const error = new Error(`OTP doesn't match!!`)
        error.statusCode = 401;
        throw error;
    }

    user.isVerified = true;

    await user.save()

    res.status(200).json({
        message: 'OTP verified successfully!'
    })

};


// exports.getGoogleCallBack = async (req, res, next) => {
//     res.redirect('http://localhost:3000/google/success')
// }


exports.successLoginGoogleAuth = async (req, res, next) => {
    // console.log( req.user.displayName, req.user.photos[0].value, req.user.emails[0].value)
    res.status(200).json({
        message: 'Success Login by google!!',
        name: req.user.displayName,
        email: req.user.emails[0].value,
        pic: req.user.photos[0].value
        // user: req.user
    })
}