import acc from "./models/acc.js";
import jern from './models/jern.js';
const { jerry, journalEntrySchema } =jern;

export const register=async(req,res)=>{
        console.log("before");
        const {name,password}=req.body;
        console.log("after");
        const newuser= new acc({name,password,journals: [] });
        await newuser.save();
        return res.status(200).send({ message: 'User registered successfully' });;
}

export const login=async(req,res)=>{
    const {name,password}=req.body;
    let user = await acc.findOne({name});
    if (!user) {
        return res.status(400).json({ msg: 'Username does not match' });
    }
    try {
        
        let match=await acc.findOne({name,password});
        if (match){
            console.log("yeaaaa");
            return res.status(200).json({name});
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}

export const journal=async(req,res)=>{
    const {name,date,text}=req.body; 
    console.log(name);
    console.log(text);
    
    // const text1 = text.slice(text.indexOf(':') + 1).trim();
    
    const newj=new jerry({name,date,text});
    await newj.save();
    await acc.findOneAndUpdate({name:name},{$push :{ journals: { date: date, text: text } }});
    return res.status(200).json({msg:"added successfully"});
}

// let match = await bcrypt.compare(request.body.password, user.password);
        // if (match) {
        //     const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
        //     const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
        //     const newToken = new Token({ token: refreshToken });
        //     await newToken.save();
        
        //     response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });
        
        // } else {
        //     response.status(400).json({ msg: 'Password does not match' })
        // }