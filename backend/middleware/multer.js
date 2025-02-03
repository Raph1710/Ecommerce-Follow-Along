const multer = require('multer');

const storage=multer.diskStorage({
    
    destination : '../uploads',

    filename: function(req, file, cb) {
        cb(null, 'uploads/'); // Define your upload folder
    },
    filename: function(req, file, cb) {
        const uniqueSuffix =  Date.now() + '-' + Math.round.apply(Math.random() * 1e9);
         // Define a unique filename
         const filename = file.originalname.split(".")[0];
         cb(null,filename + "-" + uniqueSuffix + ".png"); // Define
      },
    });

    const productStorage=multer.diskStorage({
    
        destination : '../products',
    
        filename: function(req,file,cb){
            console.log(req.body);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const filename = file.originalname.split(".")[0];
            cb(null,filename+"-"+uniqueSuffix+".png");
        },
        })

    exports.upload=multer({storage: storage});
    exports.productUpload=multer({storage: productStorage});