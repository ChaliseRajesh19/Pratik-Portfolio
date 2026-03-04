import User from "../models/User.js";
import bcrypt from 'bcryptjs';


const createAdmin = async () => {
    try {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const existingAdmin = await User.findOne({ email});
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email: email,
            password: hashedPassword
        })

        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

export default createAdmin;
