//variables
//
//[0,0] = [x,y]
//
//Right Hand
let r_A0 = [0, 0];
let r_B0 = [0, 0];
let r_A1 = [0, 0];
let r_B1 = [0, 0];
let r_A2 = [0, 0];
let r_B2 = [0, 0];
let r_A3 = [0, 0];
let r_B3 = [0, 0];
let r_thumb = [0, 0];

//Left Hand
let l_A0 = [0, 0];
let l_B0 = [0, 0];
let l_A1 = [0, 0];
let l_B1 = [0, 0];
let l_A2 = [0, 0];
let l_B2 = [0, 0];
let l_A3 = [0, 0];
let l_B3 = [0, 0];
let l_thumb = [0, 0];

let turnRight;

let move= true;
let steers_turn = 0;

const socket = new ReconnectingWebSocket("ws://localhost:4041");
socket.onopen = (event) => {

    socket.send(JSON.stringify({ "type": "board", "message": "connected" }));
};
function send_commands(command) {
    const cmd = '{"type":"board","data":"' + command + '"}';
    //  socket.send(JSON.stringify(cmd));
    socket.send(cmd);
}
function c(x) {
    if (x < 0) {
        return 0;
    }
    else if (x > 340) {
        return 340;
    }
    else {
        return x;
    }
}


function test(x, y, name) {
    // let top = (((550 / 5000) * y) );
    // let left = (((550 / 5000) * x) );
    let top = ((150 / 480) * y);
    let left = ((200 / 640) * x);
    // console.log("top :" + top);
    // console.log("left :" + left);
    document.querySelector("#" + name).style.setProperty("top", top + "px");
    document.querySelector("#" + name).style.setProperty("left", left + "px");
}
function convertToPx(x, y) {
    // let top = (((550 / 5000) * y) );
    // let left = (((550 / 5000) * x) );
    let top = ((700 / 480) * y) + 100;
    let left = ((1300 / 640) * x) + 100;
    // console.log("top :" + top);
    // console.log("left :" + left);
    return [left, top]
}
socket.onmessage = (event) => {
    // console.log(event.data);
    let objData = JSON.parse(event.data);
    if (objData.data == "stop_car") {
        //when detection is disconnected]
        document.querySelector("#hand_preview").style.setProperty("background", "#87745a");

     
    }
    if (objData.type == "detection") {
        //from detection script
        if (objData.message == "connected") {
            //when detection is connected
            server_toggle(true);

        }
        else if (objData.message == "disconnected") {
            //when detection is disconnected
            server_toggle(false);

        }
        else if (objData.message == "move") {
            //when detection is disconnected]
            document.querySelector("#hand_preview").style.setProperty("background", "#b9c2b9");

            if(move)
            {
                send_commands("move_forward");
            }
            else{
                send_commands("move_reverse");
            }

        }
         

        else if (objData.message == "send_data") {
            //when detection sends information


            // receive_co(objData.x, objData.y);
            if (objData.finger == "r_A0") {
                r_A0[0] = objData.x;
                r_A0[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }

            if (objData.finger == "r_B0") {
                r_B0[0] = objData.x;
                r_B0[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "r_A1") {
                r_A1[0] = objData.x;
                r_A1[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "r_B1") {
                r_B1[0] = objData.x;
                r_B1[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "r_A2") {
                r_A2[0] = objData.x;
                r_A2[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "r_B2") {
                r_B2[0] = objData.x;
                r_B2[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "r_A3") {
                r_A3[0] = objData.x;
                r_A3[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "r_B3") {
                r_B3[0] = objData.x;
                r_B3[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "r_thumb") {
                r_thumb[0] = objData.x;
                r_thumb[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }

            //Left Hand
            if (objData.finger == "l_A0") {
                l_A0[0] = objData.x;
                l_A0[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "l_B0") {
                l_B0[0] = objData.x;
                l_B0[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "l_A1") {
                l_A1[0] = objData.x;
                l_A1[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "l_B1") {
                l_B1[0] = objData.x;
                l_B1[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "l_A2") {
                l_A2[0] = objData.x;
                l_A2[1] = objData.y;
            }
            if (objData.finger == "l_B2") {
                l_B2[0] = objData.x;
                l_B2[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "l_A3") {
                l_A3[0] = objData.x;
                l_A3[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "l_B3") {
                l_B3[0] = objData.x;
                l_B3[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }
            if (objData.finger == "l_thumb") {
                l_thumb[0] = objData.x;
                l_thumb[1] = objData.y;
                // test(objData.x, objData.y,objData.finger);
            }


            run()
        }
        else if (objData.message == "no_hand") {
            //when detection sends information
            resetFingers();
            run();
        }



    }
}


function resetFingers() {
    // Right Hand
    r_A0 = [0, 0];
    r_B0 = [0, 0];
    r_A1 = [0, 0];
    r_B1 = [0, 0];
    r_A2 = [0, 0];
    r_B2 = [0, 0];
    r_A3 = [0, 0];
    r_B3 = [0, 0];
    r_thumb = [0, 0];

    // Left Hand
    l_A0 = [0, 0];
    l_B0 = [0, 0];
    l_A1 = [0, 0];
    l_B1 = [0, 0];
    l_A2 = [0, 0];
    l_B2 = [0, 0];
    l_A3 = [0, 0];
    l_B3 = [0, 0];
    l_thumb = [0, 0];
}


function median2(coordinate1, coordinate2) {
    let f_x = (coordinate1[0] + coordinate2[0]) / 2;
    let f_y = (coordinate1[1] + coordinate2[1]) / 2
    return [f_x, f_y]
}
function median4(coordinate1, coordinate2, coordinate3, coordinate4) {
    let f_x = (coordinate1[0] + coordinate2[0] + coordinate3[0] + coordinate4[0]) / 4;
    let f_y = (coordinate1[1] + coordinate2[1] + coordinate3[1] + coordinate4[1]) / 4;
    return [f_x, f_y]
}
function run() {
    let leftHand = median4(median2(l_A0, l_B0), median2(l_A1, l_B1), median2(l_A2, l_B2), median2(l_A3, l_B3));
    let rightHand = median4(median2(r_A0, r_B0), median2(r_A1, r_B1), median2(r_A2, r_B2), median2(r_A3, r_B3));
    // console.log("leftHand :" + leftHand);
    // console.log("rightHand :" + rightHand);
    test(leftHand[0], leftHand[1], "r_A0");
    test(rightHand[0], rightHand[1], "l_B3");
    let LC = convertToPx(leftHand[0], leftHand[1]);
    let RC = convertToPx(rightHand[0], rightHand[1]);


    if (RC[0] < 1000 && LC[0] < 1000) {
        if (RC[0] - LC[0] < 250) {

            // console.log("leftHand :" + convertToPx(leftHand[0],leftHand[1])[1]);
            // console.log("rightHand :" + convertToPx(rightHand[0],rightHand[1])[1])
            if (RC[1] > LC[1] && RC[1] - LC[1] > 30) {
                // console.log("leftHand :" + convertToPx(leftHand[0],leftHand[1])[1]);
                // console.log("rightHand :" + convertToPx(rightHand[0],rightHand[1])[1])
                document.querySelector("#steer").style.transform = "rotate(30deg)";
                if ( steers_turn != 1)
                {
                send_commands("turn_right");
                steers_turn = 1;
                }
                console.log("right turn");
            } else if (RC[1] < LC[1] && LC[1] - RC[1] > 30) {
                //     console.log("leftHand :" + convertToPx(leftHand[0],leftHand[1])[1]);
                //     console.log("rightHand :" + convertToPx(rightHand[0],rightHand[1])[1])
                document.querySelector("#steer").style.transform = "rotate(-30deg)";
                if ( steers_turn != -1)
                {
                steers_turn = -1;
                send_commands("turn_left");
                }

                console.log("left turn");
            } else {
                if ( steers_turn != 0)
                {
                send_commands("steer_straight");
                steers_turn = 0;

                }
               
                var c = RC[1] - LC[1];
                if (c > 8 || c > -8) {
                    var j = "rotate(" + parseInt(c) + "deg)";
                    document.querySelector("#steer").style.transform = j;
                } else {
                    document.querySelector("#steer").style.transform = "rotate(0deg)";
                }
            }

        }
    } else if (RC[0] > 1080 || LC[0] > 1080) {
        document.querySelector("#steer").style.transform = "rotate(0deg)";
        console.log(RC[1])

        if (RC[1] < 300) {
            document.querySelector("#stick").style.top = 0;
            document.querySelector("#stick").style.bottom = "unset";
            move=true;
        }
        else if (RC[1] > 500) {
            document.querySelector("#stick").style.top = "unset";
            document.querySelector("#stick").style.bottom = 0;
            move=false;
        }

    }
}


// move_forward
// move_reverse
// stop_car
// turn_left
// turn_right
// steer_straight
