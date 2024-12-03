<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bookingcalendar";

$mysqli = new mysqli($servername, $username, $password, $dbname);
date_default_timezone_set('Asia/Manila');
if ($mysqli ->connect_error) {
    die("Connection failed: " . $mysqli ->connect_error);
}
if(isset($_GET['date'])){
    $date = $_GET['date'];
    $stmt = $mysqli->prepare("select * from bookings where date =?");
    $stmt->bind_param('s', $date);
    $bookings = array();
    if($stmt->execute()){
        $result = $stmt->get_result();
        if($result->num_rows>0){
            while($row = $result->fetch_assoc()){
                $bookings[] = $row['timeslot'];
            }
            
            $stmt->close();
        }
    }
}


    if (isset($_GET['date']) && isset($_GET['time'])) {
        $timeStep3 = $_GET['time'];
        $dateStep3 = $_GET['date'];
        exit("<div style='text-align: center;'><h1 style='font-size: 24px;'>You have now selected a date and timeslot. Please proceed by clicking the Next button.</h1></div>");



    }
    else {
        $timeStep3 = '';
        $dateStep3 = '';

    }
if (isset($_POST['submit'])) {
    $timeslot = $_POST['timeslot'];

    list($start, $end) = explode('-', $timeslot);
 
    $firstSlot = trim($start) . '-' . trim($end);

    $dendadd30 = new DateTime($end);
        $dendadd30->add(new DateInterval("PT30M"));

        $dendsub30 = new DateTime($end);
        $dendsub30->sub(new DateInterval("PT30M"));

        $dstartadd30 = new DateTime($start);
        $dstartadd30->add(new DateInterval("PT30M"));

        $dstartsub30 = new DateTime($start);
        $dstartsub30->sub(new DateInterval("PT30M")); 

        $dendadd60 = new DateTime($end);
        $dendadd60->add(new DateInterval("PT60M"));

        $dendsub60 = new DateTime($end);
        $dendsub60->sub(new DateInterval("PT60M"));

        $dstartadd60 = new DateTime($start);
        $dstartadd60->add(new DateInterval("PT60M"));

        $dstartsub60 = new DateTime($start);
        $dstartsub60->sub(new DateInterval("PT60M"));

        $dendadd90 = new DateTime($end);
        $dendadd90->add(new DateInterval("PT90M"));

        $dendsub90 = new DateTime($end);
        $dendsub90->sub(new DateInterval("PT90M"));

        $dstartadd90 = new DateTime($start);
        $dstartadd90->add(new DateInterval("PT90M"));

        $dstartsub90 = new DateTime($start);
        $dstartsub90->sub(new DateInterval("PT90M"));

        $dendadd120 = new DateTime($end);
        $dendadd120->add(new DateInterval("PT120M"));

        $dendsub120 = new DateTime($end);
        $dendsub120->sub(new DateInterval("PT120M"));

        $dstartsub120 = new DateTime($start);
        $dstartsub120->sub(new DateInterval("PT120M"));

        $dstartadd120 = new DateTime($start);
        $dstartadd120->add(new DateInterval("PT120M"));

    $secondSlot = trim($start) . '-' . $dstartadd60->format("h:i A");

    $thirdSlot = $dstartsub60->format("h:i A") . '-' . $dendadd30->format("h:i A");

    $fourthSlot = trim($start) . '-' . $dstartadd120->format("h:i A");
    
    $fifthSlot = $dendsub60->format("h:i A") . '-' . trim($end);

    $sixthSlot = $dstartsub30->format("h:i A") . '-' . $dendadd60->format("h:i A");

    $seventhSlot = $dendsub120->format("h:i A") . '-' . trim($end);

    $identifier = $firstSlot;

    if (!in_array($firstSlot, $bookings) ) {
        $stmt = $mysqli->prepare("INSERT INTO bookings  (timeslot, date, name) VALUES (?,?,?)");
        $stmt->bind_param('sss', $firstSlot, $date, $identifier);
        $stmt->execute();

            $stmt = $mysqli->prepare("INSERT INTO bookings  (timeslot, date, name) VALUES (?,?,?)");
            $stmt->bind_param('sss', $secondSlot, $date, $identifier);
            $stmt->execute();
        
            $stmt = $mysqli->prepare("INSERT INTO bookings ( timeslot, date, name) VALUES (?,?,?)");
            $stmt->bind_param('sss', $thirdSlot, $date, $identifier);
            $stmt->execute();

            $stmt = $mysqli->prepare("INSERT INTO bookings ( timeslot, date, name) VALUES (?,?,?)");
            $stmt->bind_param('sss', $fourthSlot, $date, $identifier);
            $stmt->execute();

            $stmt = $mysqli->prepare("INSERT INTO bookings ( timeslot, date, name) VALUES (?,?,?)");
            $stmt->bind_param('sss', $fifthSlot, $date, $identifier);
            $stmt->execute();

            $stmt = $mysqli->prepare("INSERT INTO bookings ( timeslot, date, name) VALUES (?,?,?)");
            $stmt->bind_param('sss', $sixthSlot, $date, $identifier);
            $stmt->execute();

            $stmt = $mysqli->prepare("INSERT INTO bookings ( timeslot, date, name) VALUES (?,?,?)");
            $stmt->bind_param('sss', $seventhSlot, $date, $identifier);
            $stmt->execute();



        $bookings[] = $firstSlot;
        $bookings[] = $secondSlot;
        $bookings[] = $thirdSlot;
        $bookings[] = $fourthSlot;
        $bookings[] = $fifthSlot;
        $bookings[] = $sixthSlot;
        $bookings[] = $seventhSlot;
        $stmt->close();
        if ($firstSlot !== null) {
            echo "<script>";
            echo "window.parent.postMessage(['$date', '$firstSlot'], '*');";
            echo "</script>";
        }

    } else {
        $firstSlot = "";
        echo '<script>alert("Time timeslot is already taken. Please select another");</script>';
    }
}

$duration = 30;
$cleanup = 0;
$start = "8:00";
$end = "17:00";
function timeslots($duration, $cleanup, $start, $end) {
    $start = new DateTime($start);
    $end = new DateTime($end);
    $interval = new DateInterval("PT" . $duration . "M");
    $cleanupInterval = new DateInterval("PT" . $cleanup . "M");
    $slots = array();

    for ($intStart = $start; $intStart < $end; $intStart->add($interval)->add($cleanupInterval)) {
        $endPeriod = clone $intStart;
        $endPeriod->add($interval);
        if ($endPeriod > $end) {
            break;
        }
        $slots[] = $intStart->format("h:i A") . "-" . $endPeriod->format("h:i A");
    }
    return $slots;
}

?>
<!doctype html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title></title>

    <link id="themeColors" rel="stylesheet" href="../../dist/css/style.min.css" />
    <style>
        body {
            background: #f6f7fb;
        }
        .btn-success{
            background: #157347!important;
        }
        .btn-danger{
            background: #BB2D3B!important;
        }
    </style>
  </head>

  <body>
    <div class="">
     
    <h1 class="text-center" style="font-size: 36px; font-weight: bold;">Choose a timeslot for date: <?php echo date('m/d/Y', strtotime($date)); ?></h1>
    <hr>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <?php echo isset($msg)?$msg:"";?>
            </div>
            <?php 
$timeslots = timeslots($duration, $cleanup, $start, $end);
$current_datetime = strtotime(date('Y-m-d H:i')); // Get the current datetime in UNIX timestamp format

foreach($timeslots as $ts){
    $ts_parts = explode('-', $ts); // Split the time slot string into start and end time
    $end_datetime = strtotime(trim($ts_parts[1]) . ' ' . $date); // Construct the end datetime for the time slot

    ?>
    <div class="col-md-2 col-sm-3 col-xs-4 col-6" style="overflow:auto">
        <center>
            <?php if(in_array($ts, $bookings)) {?>
                <button class="btn btn-danger mb-1 w-100" style="font-size: 15px;"><?php echo $ts ?></button>
            <?php } else {
                // Check if the end datetime is earlier than the current datetime
                if ($end_datetime < $current_datetime) {?>
                    <button class="btn btn-danger mb-1 w-100" style="font-size: 15px;" ><?php echo $ts ?></button>
                <?php } else {?>
                    <button class="btn btn-success book mb-1 w-100" style="font-size: 15px;" data-timeslot="<?php echo $ts ?>"><?php echo $ts ?></button>
                <?php }
            }?>
        </center>
    </div>
<?php } ?>
        </div>
    </div>

    <div class="modal" id="myModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Timeslot</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <form action="" method="post">
                                <div class="form-group">
                                    <label for="timeslot">Are you sure you want to book for timeslot:</label>
                                    <input required type="text" readonly name="timeslot" id="timeslot"
                                        class="form-control">
                                </div>
                                <div class="form-group text-end mt-2">
                                    <button class="btn btn-primary" type="submit" name="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>








    <!-- <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous"></script> -->
        <script src="../../dist/libs/jquery/dist/jquery.min.js"></script>
    <script src="../../dist/libs/simplebar/dist/simplebar.min.js"></script>
    <script src="../../dist/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

    <!-- ---------------------------------------------- -->
    <!-- core files -->
    <!-- ---------------------------------------------- -->
    <script src="../../dist/js/app.min.js"></script>
    <script src="../../dist/js/app.init.js"></script>
    <script src="../../dist/js/app-style-switcher.js"></script>
    <script src="../../dist/js/sidebarmenu.js"></script>
    
    <script src="../../dist/js/custom.js"></script>
    <script src="../../dist/libs/prismjs/prism.js"></script>
    <script>
        $(".book").click(function(){
            var timeslot = $(this).attr('data-timeslot');
            $("#slot").html(timeslot);
            $("#timeslot").val(timeslot);
            $("#myModal").modal("show");
        })
    </script>   
  </body>

</html>