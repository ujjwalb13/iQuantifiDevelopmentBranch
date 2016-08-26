(function() {
  'use strict';
  var hasProp = {}.hasOwnProperty;

  angular.module('aggregation').controller('LinkAccountCtrl', function(onboarding, $scope, $rootScope, $routeParams, $http, $q, $location, $window, poller, Institution, Member, Job, ENV, welcomeTextService) {
    var createMember, createMfaCredentials, jobPoller, pollForJob, pollNotify, refreshMember, resumeJob;
    $scope.onboarding = onboarding;
    $scope.showManual = $routeParams.sender !== 'action';
    $scope.currentStep = 3;
    $scope.welcome = welcomeTextService.account();
    $scope.goBack = function() {
      return $window.history.back();
    };
    $scope.searchInstitutions = function(value) {
      $scope.complete = false;
      return Institution.search({
        q: value
      }).$promise.then(function(institutions) {
        return institutions;
      });
    };
    $scope.fetchCredentials = function($item, $model, $label) {
      $scope.institution = $item;
      $scope.credentials = Institution.credentials({
        id: $item.guid
      });
      return $scope.credentialValues = {
        institution_guid: $item.guid,
        credentials: {}
      };
    };
    createMember = function(member) {
      return Member.create(member).$promise.then(function(member) {
        $scope.member = member;
        return member.guid;
      });
    };
    refreshMember = function(memberId) {
      return Member.refresh({
        id: memberId
      }).$promise.then(function(member) {
        $scope.member = member;
        return member.most_recent_job_guid;
      });
    };
    jobPoller = void 0;
    pollForJob = function(jobId) {
      jobPoller = poller.get(Job, {
        action: 'get',
        delay: 15000,
        argumentsArray: [
          {
            id: jobId
          }
        ],
        smart: true
      });
      return jobPoller.promise.then(null, null, pollNotify);
    };
    pollNotify = function(job) {
      var ref, ref1;
      $scope.job = job;
      if ((ref = $scope.job.status) === 2 || ref === 6 || ref === 7 || ref === 8 || ref === 9) {
        poller.stopAll();
        $scope.processing = false;
        $scope.processingMfa = false;
        $scope.submitted = false;
        $scope.submittedMfa = false;
        if ($scope.job.status === 2) {
          $scope.mfaCredentials = Job.credentials({
            id: $scope.job.guid
          });
          return $scope.mfaCredentialValues = {};
        } else if ((ref1 = $scope.job.status) === 7 || ref1 === 8 || ref1 === 9) {
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: $scope.job.error_message,
            id: 'accountLink'
          });
        } else if ($scope.job.status === 6) {
          $scope.complete = true;
          $scope.credentials = [];
          $scope.mfaCredentials = [];
          if (onboarding) {
            return $location.path("onboard/institutions/" + $scope.job.institution_guid);
          } else {
            return $location.path("institutions/" + $scope.job.institution_guid);
          }
        }
      }
    };
    $scope.$on('$destroy', function() {
      return poller.stopAll();
    });
    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.processing = true;
        return createMember($scope.credentialValues).then(refreshMember).then(pollForJob);
      }
    };
    createMfaCredentials = function(credentials) {
      var k, v;
      return $q.all((function() {
        var results;
        results = [];
        for (k in credentials) {
          if (!hasProp.call(credentials, k)) continue;
          v = credentials[k];
          results.push($http.post(ENV.apiHost + "/aggregation/members/" + $scope.member.guid + "/credentials", {
            credential_guid: k,
            value: v
          }));
        }
        return results;
      })()).then(function(res) {
        return $scope.job.guid;
      });
    };
    resumeJob = function(jobId) {
      return Job.resume({
        id: jobId
      }).$promise.then(function(job) {
        $scope.job = job;
        return job.guid;
      });
    };
    return $scope.submitMfa = function(isValid) {
      $scope.submittedMfa = true;
      if (isValid) {
        $scope.processingMfa = true;
        return createMfaCredentials($scope.mfaCredentialValues).then(resumeJob).then(pollForJob);
      }
    };
  });

}).call(this);

//# sourceMappingURL=link-account.js.map
