var oracledb = require('oracledb');

oracledb.getConnection({
  user: "apps",
  password: "apps",
  connectString: "r01.lntinfotech.com:1542/VISPOC"
}, function(err, connection) {
  if (err) {
    console.error(err.message);
    return;
  }
  connection.execute( "SELECT BRANCH_ID, BRANCH_NAME, REGION_ID FROM ADS_BRANCH_DIMN",
    [],
    function(err, result) {
      if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
      }
      console.log(result.metaData);
      console.log(result.rows);
      doRelease(connection);
    });
});

function doRelease(connection) {
  connection.release(
    function(err) {
      if (err) {console.error(err.message);}
    }
  );
}
