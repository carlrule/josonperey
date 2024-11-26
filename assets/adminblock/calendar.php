<?php
function build_calendar($month, $year) {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bookingcalendar";

$mysqli = new mysqli($servername, $username, $password, $dbname);
date_default_timezone_set('Asia/Manila');
if ($mysqli ->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
    $stmt = $mysqli->prepare("select * from bookings where MONTH(date) = ? AND YEAR(date) = ?");
    $stmt->bind_param('ss', $month, $year);
    $bookings = array();
    if($stmt->execute()){
        $result = $stmt->get_result();
        if($result->num_rows>0){
            while($row = $result->fetch_assoc()){
                $bookings[] = $row['date'];
            }
            
            $stmt->close();
        }
    }
    
    
     // Create array containing abbreviations of days of week.
     $daysOfWeek = array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');

     // What is the first day of the month in question?
     $firstDayOfMonth = mktime(0,0,0,$month,1,$year);

     // How many days does this month contain?
     $numberDays = date('t',$firstDayOfMonth);

     // Retrieve some information about the first day of the
     // month in question.
     $dateComponents = getdate($firstDayOfMonth);

     // What is the name of the month in question?
     $monthName = $dateComponents['month'];

     // What is the index value (0-6) of the first day of the
     // month in question.
     $dayOfWeek = $dateComponents['wday'];

     // Create the table tag opener and day headers
     
    $datetoday = date('Y-m-d');

    if (isset($_GET['service'])) {
        $selectedService = $_GET['service'];
        }
    else {
        $selectedService = '';
    }
    
    $calendar = "<table class='table table-bordered'>";
    $calendar .= "<center><h2>$monthName $year</h2>";
    $calendar .= "<a class='btn btn-xs btn-sm py-0 btn-primary' href='?month=" . date('m', mktime(0, 0, 0, $month - 1, 1, $year)) . "&year=" . date('Y', mktime(0, 0, 0, $month - 1, 1, $year)) . "&service=$selectedService'>Previous Month</a> ";
    $calendar .= "<a class='btn btn-xs btn-sm py-0 btn-primary' href='?month=" . date('m') . "&year=" . date('Y') . "&service=$selectedService'>Current Month</a> ";
    $calendar .= "<a class='btn btn-xs btn-primary btn-sm py-0' href='?month=" . date('m', mktime(0, 0, 0, $month + 1, 1, $year)) . "&year=" . date('Y', mktime(0, 0, 0, $month + 1, 1, $year)) . "&service=$selectedService'>Next Month</a></center><br>";
    
    
        
      $calendar .= "<tr>";

     // Create the calendar headers

     foreach($daysOfWeek as $day) {
          $calendar .= "<th  class='header'>$day</th>";
     } 

     // Create the rest of the calendar

     // Initiate the day counter, starting with the 1st.

     $currentDay = 1;

     $calendar .= "</tr><tr>";

     // The variable $dayOfWeek is used to
     // ensure that the calendar
     // display consists of exactly 7 columns.

     if ($dayOfWeek > 0) { 
         for($k=0;$k<$dayOfWeek;$k++){
                $calendar .= "<td  class='empty'></td>"; 

         }
     }
    
     
     $month = str_pad($month, 2, "0", STR_PAD_LEFT);
  
     while ($currentDay <= $numberDays) {

          // Seventh column (Saturday) reached. Start a new row.

          if ($dayOfWeek == 7) {

               $dayOfWeek = 0;
               $calendar .= "</tr><tr>";

          }
          
          $currentDayRel = str_pad($currentDay, 2, "0", STR_PAD_LEFT);
          $date = "$year-$month-$currentDayRel";
          
            $dayname = strtolower(date('l', strtotime($date)));
            $eventNum = 0;
            $today = $date==date('Y-m-d')? "today" : "";

     


            
            


        
            if (isset($_GET['blockedDate'])) {
                $blockedDate = $_GET['blockedDate'];
                
            } else {
                $blockedDate = '';
            }
            
            
          
                if (isset($_GET['date']) && isset($_GET['time'])) {
                    echo "<script>document.getElementById('date').style.display = 'none';</script>";
                    $timeStep3 = $_GET['time'];
                    $dateStep3 = $_GET['date'];
                    exit("<center><h2 id='you_have_selected'>You have already selected a date and timeslot.</h2></center>");
                }
                else {
                    $timeStep3 = '';
                    $dateStep3 = '';
    
                }
                 if (isset($selectedService) && !empty($selectedService)) {
            
                    if ($selectedService === "Oral Prophylaxis (₱1,650)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3  )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";   
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Extraction (₱2,000)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3 )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";   
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Light Curing (₱3,500)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3 )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";  
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";;
                            }            
                        }
                    }
                    elseif ($selectedService === "Pits and Fissure (₱3,500)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3 )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";   
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Pits and Fissure (₱3,500)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3 )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book60.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>"; 
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book60.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Flouride Application (₱7,500)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3)){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>"; 
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Periodontal Treatment (₱10,000)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3 )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";   
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Endodotontic Treatment (₱4,200)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3)){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book60.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";   
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book60.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Orthodontic Attachment (₱38,000)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3)){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book120.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";   
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book120.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";;
                            }            
                        }
                    }
                    elseif ($selectedService === "Orthodontic Adjustment (₱1,200)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3 )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>"; 
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Removable Patial Denture (₱28,000)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3)){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";  
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";;
                            }            
                        }
                    }
                    elseif ($selectedService === "Complete Denture (₱20,000)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3 )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";   
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Crown and Bridges (₱10,000)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3 )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";  
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Flexite Denture (₱30,000)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3 )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";  
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book30.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Laminate Veneer (₱10,350)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3 )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book60.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";  
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book60.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                    elseif ($selectedService === "Teeth Whitening (₱7,000)") {
                        if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3 )){
                            $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                        }else{
        
                            $totalbookings = checkSlots($mysqli,$date);
                            if($totalbookings==18){
                                $calendar.="<td class='$today'><h4>$currentDay</h4><a href='book60.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";  
                            } else {
                                $availableslots = 18 - $totalbookings;
                            $calendar.="<td class='$today'><h4>$currentDay</h4> <a href='book60.php?date=".$date."' class='btn btn-success btn-sm py-0' onclick=\"myFunction('$date')\">Open</a>";
                            }            
                        }
                    }
                }
                else {
              
                    if($date<=date('Y-m-d') || ($dayOfWeek == 0) || ($dayOfWeek == 3) ){
                        
                        $calendar.="<td><h4>$currentDay</h4> <button class='btn btn-danger btn-sm py-0'>Close</button>";
                    }else{
           
                       $totalbookings = checkSlots($mysqli, $date);
                           if ($totalbookings == 18) {
                               $calendar .= "<td class='$today'><h4>$currentDay</h4><a href='#' onclick=\"sendDateToParent('$date')\" class='btn btn-success btn-sm py-0'>Open</a>";
                           } else {
                               $availableslots = 18 - $totalbookings;
                               $calendar .= "<td class='$today'><h4>$currentDay</h4><a href='#' onclick=\"sendDateToParent('$date')\" class='btn btn-success btn-sm py-0'>Open</a>";
                           }
            
                   }

                }
            
          $calendar .="</td>";
          // Increment counters
 
          $currentDay++;
          $dayOfWeek++;

     }
     
     

     // Complete the row of the last week in month, if necessary

     if ($dayOfWeek != 7) { 
     
          $remainingDays = 7 - $dayOfWeek;
            for($l=0;$l<$remainingDays;$l++){
                $calendar .= "<td class='empty'></td>"; 

         }

     }
     
     $calendar .= "</tr>";

     $calendar .= "</table>";

     echo $calendar;

}
    function checkSlots($mysqli, $date){
        $stmt = $mysqli->prepare("select * from bookings where date = ?");
        $stmt->bind_param('s', $date);
        $totalbookings = 0;
        if($stmt->execute()){
            $result = $stmt->get_result();
            if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
                    $totalbookings++;
            }
            $stmt->close();
        }
    }
    return $totalbookings;
    }
?>

<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<style>
        body {
            background: #f6f7fb;
        }
       @media only screen and (max-width: 760px),
        (min-device-width: 802px) and (max-device-width: 1020px) {


            .empty {
                display: none;
            }

            /* Hide table headers (but not display: none;, for accessibility) */
            th {
                position: absolute;
                top: -9999px;
                left: -9999px;
            }

            tr {
                border: 1px solid #ccc;
            }

            td:nth-of-type(1):before {
                content: "Sun";
            }
            td:nth-of-type(2):before {
                content: "Mon";
            }
            td:nth-of-type(3):before {
                content: "Tue";
            }
            td:nth-of-type(4):before {
                content: "Wed";
            }
            td:nth-of-type(5):before {
                content: "Thu";
            }
            td:nth-of-type(6):before {
                content: "Fri";
            }
            td:nth-of-type(7):before {
                content: "Sat";
            }


        }

         @media only screen and (min-device-width: 772px) and (max-device-width: 1020px) {
            body {
                width: 100%;
            }
            td {
                width: 20%;
            }
            tr{
                display:flex;
            }
        }
         @media only screen and (min-device-width: 100px) and (max-device-width: 771px) {
            td {
                width: 10%;
            }
            
        }
        
    </style>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
            <center><h1 id="date" style='font-size: 36px; font-weight: bold;'>Select a date:</h1></center>

                <?php
                     $dateComponents = getdate();
                     if(isset($_GET['month']) && isset($_GET['year'])){
                         $month = $_GET['month']; 			     
                         $year = $_GET['year'];
                     }else{
                         $month = $dateComponents['mon']; 			     
                         $year = $dateComponents['year'];
                     }
                    echo build_calendar($month,$year);
                ?>
            </div>
        </div>
    </div>

    <script>
function myFunction(date) {
    // Send the selected date to the parent frame
    window.parent.postMessage(date, '*'); // '*' allows communication with any parent frame
}
</script>
<script>
var blockedDate = '';

function receiveMessage(event) {
    if (event.origin !== window.location.origin) { 
        return;
    }
    if (event.data.type === "blockdate") {
        blockedDate = event.data.value;
        updatecalender();
    }
}

window.addEventListener('message', receiveMessage, false);

function updatecalender(){
    window.location.href = 'calendar.php?blockedDate=' + blockedDate;
}

</script>

</body>

</html>
