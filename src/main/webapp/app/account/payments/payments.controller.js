(function() {
    'use strict';

    angular
        .module('seoApp')
        .controller('PaymentsController', PaymentsController);

    PaymentsController.$inject = ['Auth', 'Principal', 'SocialService', '$window', '$routeParams', '$scope', '$location', '$mdToast'];

    function PaymentsController (Auth, Principal, SocialService, $window, $routeParams, $scope, $location, $mdToast) {

        var vm = this;

        if($location.search().successful === 'true'){
          $mdToast.show(
            $mdToast.simple()
              .textContent('Success!')
              .position('top')
              .hideDelay(3000)
              .theme("success-toast")
          );
        }else if($location.search().successful === 'false'){
          $mdToast.show(
            $mdToast.simple()
              .textContent('Error!')
              .position('top')
              .hideDelay(3000)
              .theme("error-toast")
          );
        }

        vm.success = null;// ($location.search()).successful;
        vm.csrf = SocialService.getCSRF();
        vm.submitPayment = submitPayment;

        Principal.identity().then(function(account) {
            vm.account = account;
        });

        function submitPayment(){
          $window.alert("!!!!!!AAAAA");
          var $form = angular.element('#payment-form');
            $form.submit(function(event) {
            // Disable the submit button to prevent repeated clicks:
            $form.find('.submit').prop('disabled', true);

            // Request a token from Stripe:
                Stripe.card.createToken($form, stripeResponseHandler);
                $window.alert("!!!!!!AAAAA");
            // Prevent the form from being submitted:
            return false;
          });
        }

        function stripeResponseHandler(status, response) {
          $window.alert("!!!!!!AAAAA");
          var $form = angular.element('#payment-form');
          var text = $form.find('input[name="stripeEmail"]').val();
          $window.alert(text);
          // Grab the form:
          var $form = angular.element('#payment-form');

            if (response.error) { // Problem!

            // Show the errors on the form:
              $form.find('.payment-errors').text(response.error.message);
              $form.find('.submit').prop('disabled', false); // Re-enable submission

          } else { // Token was created!
            var text = $form.find('input[name="stripeEmail"]').val();
            //$window.alert(text);
            // Get the token ID:
            //var token = response.id;

            // Insert the token ID into the form so it gets submitted to the server:
            //$form.append(angular.element('<input type="hidden" name="stripeToken">').val(token));

            // Submit the form:
            //$form.get(0).submit();
            }
        }

    }
})();
