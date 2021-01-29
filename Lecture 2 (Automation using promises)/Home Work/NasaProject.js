const puppeteer = require("puppeteer");
const fs = require("fs");
let cFile = process.argv[2];

(async () => {
    // set some options (set headless to false so we can see 
    // this automated browsing experience)
    try{
    let launchOptions = { headless: false, defaultViewport: null, args: ["--start-maximized", "--disable-notifications"]};

    const browser = await puppeteer.launch(launchOptions);
    const pages = await browser.pages();
    let page = pages[0];
    
    // OPENING NASA WEBSITE
    await page.goto("https://www.nasa.gov/");

    // await page.click("#nasa-main-menu");
    // SELECTOR FOR MAIN MENU
    await page.waitForSelector("#nasa-main-menu li a");
    let NavBar = await page.$$("#nasa-main-menu li a");

    // console.log(NavBar.length);
    
    // CLICKING ON IMAGE GALLERY
    let clickGallery = NavBar[26];
    await clickGallery.click();
    
    // CLICKING ON ALL IMAGE OF THE DAY PICTURES
    let IOTD = NavBar[27];
   
    await Promise.all([IOTD.click(), page.waitForNavigation({
        waitUntil: "networkidle0"
    })]);

    // ALTERNATE WAY FOR IMAGE SEARCH
    // let ImageUrl = await page.evaluate(function(ele){
    //     return ele.getAttribute("href")
    // } , NavBar[27])

    // await page.goto("https://www.nasa.gov/" + ImagesUrl);


    //  LIST OF ALL IMAGE OF DAY PICTURES
    await page.waitForSelector(".inner.img-wrapper a div");
    let AllImages = await page.$$(".inner.img-wrapper a div")
    // console.log(AllImages.length);

    let ReleasedImage = AllImages[0];

    // CLICKING ON IMAGE OF THE DAY
    await ReleasedImage.click()


    // await Promise.all([ReleasedImage.click(), page.waitForNavigation({
    //     waitUntil: "networkidle0"
    // })]);



    // SELECTING TITLE AND CAPTION OF IMAGE
    await page.waitForSelector("#title");
    let titleselect  = await page.$("#title");

    let title = await page.evaluate(function(ele){
       return ele.textContent;
    } , titleselect);

    // console.log(title);

    await page.waitForSelector("div.row")
    let caption = await page.$("div.row");

    let captiontext = await page.evaluate(function(ele){
        return ele.textContent;
    } , caption)


    await page.waitForSelector(".blue-bold");
    let imagefeature = await page.$(".blue-bold");

    let imagefeatureUrl =  await page.evaluate(function(ele){
        return ele.getAttribute("href")
    } , imagefeature);

    imagefeatureUrl = "https://www.nasa.gov" + imagefeatureUrl;


    // SELECTING LINK TO DOWNLOAD IMAGE
    await page.waitForSelector(".col-xs-2.col-sm-3 a");
    let ImageSelector =  await page.$(".col-xs-2.col-sm-3 a");

    let Imagehref = await page.evaluate(function(ele){
        return ele.getAttribute("href")
    } , ImageSelector)

    // console.log(Imagehref);
    

    // DOWNLOADING IMAGE OF THE DAY
    let Imagepage = await browser.newPage()
    let viewSource = await Imagepage.goto("https://www.nasa.gov" + Imagehref);

    let buffer = await viewSource.buffer();

    await fs.promises.writeFile('NasaImage.jpg' , buffer );

    
    // UPLOADING THE IMAGE TO SOCIAL MEDIA
    await Uploadtofacebook(browser , captiontext , title , imagefeatureUrl);

    }
    catch(err){
      console.log(err);
    }
})();


async function Uploadtofacebook(browser , captiontext , title , imagefeatureUrl){
  let tab = browser.newPage();
  
  // Login 
  let data = await fs.promises.readFile(cFile);
  let {url, user, pwd} = JSON.parse(data);

  await (await tab).goto(url, { waitUntil: "networkidle2" });
  await (await tab).waitForSelector("input[type=email]");
  await (await tab).type("input[type=email]", user, { delay: 120 });
  await (await tab).type("input[type=password]", pwd, { delay: 120 });
  
  await Promise.all([
      await (await tab).click(".login_form_login_button"), (await tab).waitForNavigation({ timeout : 60000 , 
        waitUntil: "networkidle2"
      })
    ])
    
  // clicking on Create post
    await (await tab).click("._4-h7._5qtn");

    // Selector for writing title and caption
    await (await tab).waitForSelector("._1mf._1mj");
    let inputtext = await (await tab).$("._1mf._1mj")
    
    // Writing title and caption of the post
    await inputtext.type(title);
    await (await tab).keyboard.press("Enter");
    await inputtext.type(captiontext)
    await inputtext.type(imagefeatureUrl);
    


    // await (await tab).click("li._5xmp.fbReactComposerAttachmentSelector_WITH_TAG");
    
    // TAGGING FRIENDS
    // await (await tab).waitForSelector("label._58ak._3ct8 input" , {timeout : 5000});
    // let Enterfriend = await (await tab).$("label._58ak._3ct8 input");
    // await Enterfriend.type("Yash Mittal");
    // await (await tab).keyboard.press("PageDown");
    // await (await tab).keyboard.press("Enter");




    // get the selector input type=file (for upload file)
    await (await tab).waitForSelector("input[type = file]");
    await (await tab).waitFor(2000);
    let uploadHandle = await (await tab).$("input[type = file]");
    

    // prepare file to upload, I'm using NasaImage.jpg file on same directory as this script
    let filetoUpload = 'NasaImage.jpg';
     
    // // Sets the value of the file input to fileToUpload
    await uploadHandle.uploadFile(filetoUpload);
  
  // wait for Upload
  await (await tab).waitFor(5000);


  
  
  // Click Post
   await (await tab).click("button._1mf7._4r1q._4jy0._4jy3._4jy1._51sy.selected._42ft")
     
  
}