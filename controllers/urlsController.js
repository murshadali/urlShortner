import {urlValidate} from '../validations/urls.validation.js'
import db from '../db/index.js'
import {nanoid} from 'nanoid'
import {userTable, urlsTable} from '../models/index.js'
import {eq} from 'drizzle-orm'



export const shortenController = async (req, res)=>{
    if(!req.user.userId){
        return res.status(401).json({
            success: false,
            message: 'user not logged in',
            error: true,
        })
    }
    const valideData = await urlValidate.safeParseAsync(req.body)
    if(valideData.error){
        return res.status(402).json({
            success: false,
            message: valideData.error,
            error: true,
        })
    }
    
    const {url, code}= valideData.data
    const shortCode = code ?? nanoid(6)
    const [result] = await db.insert(urlsTable).values({
        shortCode,
        targetUrl: url,
        userId: req.user.userId
    }).returning({
        id:urlsTable.id,
        shortCode: urlsTable.shortCode,
        url: urlsTable.targetUrl,
    })
    return res.status(200).json(
        {
            id: result.id,
            shortCode: result.shortCode,
            urls:result.urls,  
        }
    )

}
export const redirectController = async(req, res)=>{
    const code = req.params.shortCode;
    const [result] = await db.select({targetUrl:urlsTable.targetUrl,shortCode:urlsTable.shortCode}).from(urlsTable).where(eq(urlsTable.shortCode,code))
    if(!result){
        return res.status(404).json({
            error:"url invalid",
        })
    }
    res.redirect(result.targetUrl);
}