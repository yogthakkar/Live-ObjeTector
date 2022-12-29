img = "";
statuses = "";
object = [];

function preload()
{
    img = loadImage("dog_cat.jpg");
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw()
{
    image(video, 0, 0, 640, 420);

    if(statuses != "")
    {
        r = random(225);
        g = random(225);
        b = random(225);

        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + object.length;

            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }

}

function modelLoaded()
{
    console.log("Model Loaded!");
    statuses = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }

    console.log(results);
    object = results;

}