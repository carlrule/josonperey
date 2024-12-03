<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bookingcalendar";

$mysqli = new mysqli($servername, $username, $password, $dbname);

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

        $dstartsub60 = new DateTime($start);
        $dstartsub60->sub(new DateInterval("PT60M"));

        $dendadd120 = new DateTime($end);
        $dendadd120->add(new DateInterval("PT120M"));

        $dstartsub120 = new DateTime($start);
        $dstartsub120->sub(new DateInterval("PT120M"));

        $firstSlot = trim($start) . '-' . trim($end);

        $secondSlot = trim($start) . '-' . $dendsub30->format("h:i A");

        $thirdSlot = $dstartadd30->format("h:i A"). '-' . trim($end);

        $fourthSlot = trim($start) . '-' . $dendadd60->format("h:i A");
    
        $fifthSlot = $dstartsub60->format("h:i A") . '-' . trim($end);

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
        
        
    
        
            $bookings[] = $firstSlot;
            $bookings[] = $secondSlot;
            $bookings[] = $thirdSlot;
            $bookings[] = $fourthSlot;
            $bookings[] = $fifthSlot;
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
$duration = 60;
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

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/main.css">
    <style>
        body {
        background: #f6f7fb;
        }
    </style>
  </head>

  <body>
    <div class="container">
     
    <h1 class="text-center" style="font-size: 36px; font-weight: bold;">Choose a timeslot for date: <?php echo date('m/d/Y', strtotime($date)); ?></h1>
    <hr>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <?php echo isset($msg)?$msg:"";?>
            </div>
            <?php $timeslots = timeslots($duration, $cleanup, $start, $end);
                foreach($timeslots as $ts){
            ?>
            <div class="col-md-2">
                <div class="form-group text-center">
                <?php if(in_array($ts,$bookings)) {?>
                    <button class="btn btn-danger"><?php echo $ts ?></button>
                <?php } else {?>
                    <button class="btn btn-success book" data-timeslot="<?php echo $ts ?>"><?php echo $ts ?></button>
                <?php } ?>
                </div>
            </div>
                <?php } ?>
        </div>
    </div>
    <div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->   
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Confirm Timeslot</h4>
      </div>
      <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <form action="" method="post">
                        <div class="form-group">
                            <label for="">Are you sure you want to book for timeslot:</label>
                            <input required type="text" readonly name="timeslot" id="timeslot" class="form-control">
                        </div>
                       
                        <div class="form-group pull-right">
                            <button class="btn btn-primary" type="submit" name="submit">Submit</button> 
                        </div>
                    </form>
                </div>
            </div>
      </div>
    </div>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

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