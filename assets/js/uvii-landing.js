var Api = {

  slackIt: function (slackWebhookUrl, payload) {
    return fetch(slackWebhookUrl,
      { method: 'post',
        body: JSON.stringify(payload)
      }).then(function (response) {
      // return response.json();
        return null
      })
  }

}

function onDemoButtonClick (eventArgs) {
  eventArgs.preventDefault()
  window.Intercom('show')
}

function configureIntercomIfExists () {
  if (window.Intercom) {
    var $demoButtons = document.querySelectorAll('.js-demo-button')
    for (var i = 0; i < $demoButtons.length; i++) {
      $demoButtons.item(i).onclick = onDemoButtonClick
    }
  }
}

function getUserInfoAndSlackIt () {
  UserInfo.getInfo(function (data) {
    // the "data" object contains the info

    var payload = {
      'text': "Un utilisateur s'est connecté sur la landing UVII",
      'attachments': [{
        'title': 'UVII',
        'fields': [{
          'title': 'IP',
          'value': data.ip_address ? data.ip_address : 'N/A',
          'short': false
        },
        {
          'title': 'Continent',
          'value': data.continent ? data.continent.name : 'N/A',
          'short': false
        },
        {
          'title': 'Country',
          'value': data.country ? data.country.name : 'N/A',
          'short': false
        },
        {
          'title': 'City',
          'value': data.city ? data.city.name : 'N/A',
          'short': false
        },
        {
          'title': 'Position',
          'value': data.position ? JSON.stringify(data.position) : 'N/A',
          'short': false
        }
        ]
      }]
    }

    Api.slackIt('https://hooks.slack.com/services/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', payload)
  }, function (err) {
    // the "err" object contains useful information in case of an error
    // Ignore errors
  })
}

configureIntercomIfExists()

getUserInfoAndSlackIt()
