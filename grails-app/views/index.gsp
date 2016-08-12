<!DOCTYPE html>
<html lang="en" class="no-js">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta charset="utf-8">
        <title>Prototype</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <asset:stylesheet src="application.css"/>
    </head>

    <body ng-app="contport" ng-controller="AppCtrl as appCtrl">
        <!--[if lte IE 8]>
          <p class="browsehappy">You are using an <strong>old</strong> browser. Please <a href="https://www.google.com/chrome/">update your explorer</a> for a better experience.</p>
        <![endif]-->

        <toaster-container toaster-options="
            {
                'position-class': 'toast-top-center',
                'time-out': { 'toast-success': 3000 },
                'close-button': { 'toast-error': true, 'toast-warning': true }
            }">
        </toaster-container>

        <treasure-overlay-spinner active='spinner.active'>

            <div class="header">
                <div ui-view="header"></div>
            </div>

            <div class="container">
                <div ui-view="content"></div>
            </div>

            <div class="footer">
                <div class="container">
                    <p><small>&copy;2016 Prototype</small></p>
                </div>
            </div>

        </treasure-overlay-spinner>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
        <script>
            !function(A,n,g,u,l,a,r){A.GoogleAnalyticsObject=l,A[l]=A[l]||function(){
                (A[l].q=A[l].q||[]).push(arguments)},A[l].l=+new Date,a=n.createElement(g),
                r=n.getElementsByTagName(g)[0],a.src=u,r.parentNode.insertBefore(a,r)
            }(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-XXXXX-X');
            ga('send', 'pageview');
        </script>

        <asset:javascript src="/contport/contport.js" />
    </body>
</html>
