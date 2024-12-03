<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dateToDelete = $_POST["date"];
    $timeslotToDelete = $_POST["timeslot"];
    $nameToDelete = $_POST["name"];

    list($start, $end) = explode('-', $timeslotToDelete);
 
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

        $firstSlot = trim($start) . '-' . trim($end);

        $secondSlot = trim($start) . '-' . $dendsub30->format("h:i A");

        $thirdSlot = $dstartadd30->format("h:i A"). '-' . trim($end);

        $fourthSlot = trim($start) . '-' . $dendadd60->format("h:i A");
    
        $fifthSlot = $dstartsub60->format("h:i A") . '-' . trim($end);


    
    $servername = "localhost";
    $username = "u453267577_josonpereybook";
    $password = "C@pston3"; 
    $dbname = "u453267577_dentistbooking";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // SQL query to delete the data


    $stmt = $conn->prepare("DELETE FROM bookingsrobert WHERE date = ? AND timeslot = ? AND name = ?");
    $stmt->bind_param('sss', $dateToDelete, $firstSlot, $nameToDelete);
    $stmt->execute();

    $stmt = $conn->prepare("DELETE FROM bookingsrobert WHERE date = ? AND timeslot = ? AND name = ?");
    $stmt->bind_param('sss', $dateToDelete, $secondSlot, $nameToDelete);
    $stmt->execute();

    $stmt = $conn->prepare("DELETE FROM bookingsrobert WHERE date = ? AND timeslot = ? AND name = ?");
    $stmt->bind_param('sss', $dateToDelete, $thirdSlot, $nameToDelete);
    $stmt->execute();

    $stmt = $conn->prepare("DELETE FROM bookingsrobert WHERE date = ? AND timeslot = ? AND name = ?");
    $stmt->bind_param('sss', $dateToDelete, $fourthSlot, $nameToDelete);
    $stmt->execute();

    $stmt = $conn->prepare("DELETE FROM bookingsrobert WHERE date = ? AND timeslot = ? AND name = ?");
    $stmt->bind_param('sss', $dateToDelete, $fifthSlot, $nameToDelete);
    $stmt->execute();

    $stmt = $conn->prepare("DELETE FROM bookingsrobert WHERE date = ? AND timeslot = ? AND name = ?");
    $stmt->bind_param('sss', $dateToDelete, $sixthSlot, $nameToDelete);
    $stmt->execute();

    $stmt = $conn->prepare("DELETE FROM bookingsrobert WHERE date = ? AND timeslot = ? AND name = ?");
    $stmt->bind_param('sss', $dateToDelete, $seventhSlot , $nameToDelete);
    $stmt->execute();


    // Close the database connection
    $conn->close();
}
?>