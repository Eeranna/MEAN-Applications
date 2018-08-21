const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://172.28.41.19:27017/partner_analytics_dashboard', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};
const connection2 = (closure) => {
  return MongoClient.connect('mongodb://172.28.41.19:27017/supplier_analytics_dashboard', (err, db) => {
    if (err) return console.log(err);

  closure(db);
});
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
const response = {
    status: 200,
    data: [],
    message: null
};

router.get('/vendors', (req, res) => {
  connection2((db) => {
        db.collection('top_5_vendors_by_spend')
          .aggregate([
            {
              $project: {
                _id: '$vendorName',
                Budget: '$Budget',
                Actuals: '$Actuals'
              }
            }
          ])
            .toArray()
            .then((keys) => {
                response.data = keys;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/locationsbyspend', (req, res) => {
  connection2((db) => {
  db.collection('top_5_locations_by_spend')
    .aggregate([
      {
        $project: {
          _id: '$locationName',
          Budget: '$Budget',
          Actuals: '$Actuals'
        }
      }
    ])
    .toArray()
    .then((keys) => {
    response.data = keys;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

router.get('/aggregate', (req, res) => {
          connection((db) => {
          db.collection('PV_STMT_WORK_CNTGNT_WRKR')
          .aggregate([
          { $group: { _id: "$STATEMENT_OF_WORK_STATUS_CD", count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ])
        .toArray()
        .then((keys) => {
        response.data = keys;
        res.json(response);
      })
      .catch((err) => {
          sendError(err, res);
       });
    });
});

router.get('/balance', (req, res) => {
  connection((db) => {
  db.collection('PV_STMT_WORK_CNTGNT_WRKR')
    .aggregate([
      { 	$group: { _id: '$COMPANY_CD',
        MAXIMUM_BUDGET_AMOUNT: { $sum: '$MAXIMUM_BUDGET_AMT'},
        SPEND_TO_TRANSACTIONAL_DT_AMT: { $sum: '$SPEND_TO_TRANSACTIONAL_DT_AMT' },
      }
      },
      {
        $project: {
          MAXIMUM_BUDGET_AMOUNT: '$MAXIMUM_BUDGET_AMOUNT',
          SPEND_TO_TRANSACTIONAL_DT_AMT: '$SPEND_TO_TRANSACTIONAL_DT_AMT',
          BALANCE_TO_SPEND: { $subtract: [ '$MAXIMUM_BUDGET_AMOUNT', '$SPEND_TO_TRANSACTIONAL_DT_AMT' ] }
        }
      },
      { $sort: { EDW_UPDATE_DTM: 1, EDW_CREATE_DTM: 1 } },
      { "$limit": 5 }
    ])
    .toArray()
    .then((keys) => {
    response.data = keys;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

router.get('/monthly', (req, res) => {
  connection2((db) => {
  db.collection('total_spend')
    .aggregate([
      {
        $project: {
          _id: '$quarter',
          Budget: '$Budget',
          Actuals: '$Actuals'
        }
      }
    ])
    .toArray()
    .then((keys) => {
    response.data = keys;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

router.get('/quarterly', (req, res) => {
  connection2((db) => {
  db.collection('total_spend')
    .aggregate([
      {
        $project: {
          _id: '$quarter',
          Budget: '$Budget',
          Actuals: '$Actuals'
        }
      }
    ])
    .toArray()
    .then((keys) => {
    response.data = keys;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

//Get Description Drop Down
router.get('/description', (req, res) => {
  connection((db) => {
  db.collection('PV_HR_LOCATION')
    .distinct('BK_HR_LOCATION_CD')
    .then((keys) => {
    response.data = keys;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

//Get Country Drop Down
router.get('/country', (req, res) => {
  connection((db) => {
  db.collection('PV_HR_LOCATION')
    .distinct('BK_ISO_COUNTRY_CD')
    .then((keys) => {
    response.data = keys;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

//SOW Analysis Code
router.get('/sowbalance', (req, res) => {
  connection2((db) => {
  db.collection('total_spend')
    .aggregate([
      {
        $project: {
          _id: '$quarter',
          Budget: '$Budget',
          Actuals: '$Actuals'
        }
      }
    ])
    .toArray()
    .then((keys) => {
    response.data = keys;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

//Location
router.get('/location', (req, res) => {
  connection((db) => {
  db.collection('PV_TEMPORARY_JOB_POSTING')
    .aggregate([
      { $group: { _id: '$HR_LOCATION_KEY',
        ESTIMATED_SPEND_LOCAL_AMT: { $sum: '$ESTIMATED_SPEND_LOCAL_AMT'},
      }
      },
      {
        $project: {
          ESTIMATED_SPEND_LOCAL_AMT: '$ESTIMATED_SPEND_LOCAL_AMT',
        }
      },
      { $sort: { BALANCE_DIFFERENCE: 1 } },
      { "$limit": 5 }
    ])
    .toArray()
    .then((keys) => {
    response.data = keys;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

//VENDOR INVOICE
router.get('/vendor', (req, res) => {
  connection((db) => {
  db.collection('PV_VENDOR_INVOICE')
    .aggregate([
      { $group: { _id: '$VENDOR_INVOICE_KEY',
        VENDOR_INVOICE_AMT: { $sum: '$VENDOR_INVOICE_AMT'},
      }
      },
      {
        $project: {
          VENDOR_INVOICE_AMT: '$VENDOR_INVOICE_AMT',
        }
      },
      { $sort: { BALANCE_DIFFERENCE: 1 } },
      { "$limit": 5 }
    ])
    .toArray()
    .then((keys) => {
    response.data = keys;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});


//CATEGORY INVOICE
router.get('/category', (req, res) => {
  connection2((db) => {
  db.collection('total_spend')
    .aggregate([
      {
        $project: {
          _id: '$quarter',
          Budget: '$Budget',
          Actuals: '$Actuals'
        }
      }
    ])
    .toArray()
    .then((keys) => {
    response.data = keys;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

router.get('/headcount', (req, res) => {
  connection2((db) => {
  db.collection('total_headcount')
    .aggregate([
          {
        $project: {
          _id: '$quarter',
          Headcount: '$headcount'
        }
      }
    ])
    .toArray()
    .then((keys) => {
    response.data = keys;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

module.exports = router;
