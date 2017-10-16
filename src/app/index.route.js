(function() {
  'use strict';

  angular
    .module('eKinerja')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/login/loginEKInerja.html',
        controller: 'LoginEKinerjaController',
        controllerAs: 'login'
      })
      .state('homeEKinerja', {
        url: '/main',
        templateUrl: 'app/homeEKinerja/home.html',
        controller: 'HomeController',
        controllerAs: 'homeekinerja'
      })
      .state('welcomeEkinerja', {
        url: '/welcome',
        templateUrl: 'app/welcome/welcome.html',
        controller: 'welcomeController',
        controllerAs: 'welcomeekinerja'
      })
      .state('master-urtug', {
        url: '/master/urtug',
        templateUrl: 'app/formMaster/urtug/masterUrtug.html',
        controller: 'MasterUrtugController',
        controllerAs: 'urtug'
      })
      .state('urtug-jabatan', {
        url: '/urtug/jabatan',
        templateUrl: 'app/uraianJabatan/pengumpulanDataBebanKerja.html',
        controller: 'PengumpulanDataBebanKerjaController',
        controllerAs: 'urtug_jabatan'
      })
      .state('aktivitas', {
        url: '/aktivitas',
        templateUrl: 'app/aktivitasPegawai/aktivitasPegawai.html',
        controller: 'AktivitasPegawaiController',
        controllerAs: 'aktivitas'
      })
      .state('hakakses', {
        url: '/hak-akses',
        templateUrl: 'app/hakAkses/hakAkses.html',
        controller: 'HakAksesController',
        controllerAs: 'akses'
      })
      .state('kontrak', {
        url: '/kontrak-pegawai',
        templateUrl: 'app/kontrakPegawai/kontrakPegawai.html',
        controller: 'KontrakPegawaiController',
        controllerAs: 'kontrak'
      })
      .state('inidpa', {
        url: '/dpa',
        templateUrl: 'app/kontrakPegawai/kontrakPegawai.html',
        controller: 'KontrakPegawaiController',
        // controllerAs: 'kontrakdpa'
        resolve:{
          reload: function(){
            $state.go('kontrak');
          }
        }
      })
      .state('bukandpa', {
        url: '/nondpa',
        templateUrl: 'app/kontrakPegawai/kontrakPegawai.html',
        controller: 'KontrakPegawaiController',
        // controllerAs: 'kontraknondpa'
        resolve:{
          reload: function(){
            $state.go('kontrak');
          }
        }
      })
      .state('setting', {
        url: '/settings',
        templateUrl: 'app/kontrakPegawai/kontrakPegawai.html',
        controller: 'KontrakPegawaiController',
        // controllerAs: 'kontrakdpa'
        resolve:{
          reload: function(){
            $state.go('kontrak');
          }
        }
      })
      .state('skin', {
        url: '/skins',
        templateUrl: 'app/kontrakPegawai/kontrakPegawai.html',
        controller: 'KontrakPegawaiController',
        // controllerAs: 'kontraknondpa'
        resolve:{
          reload: function(){
            $state.go('kontrak');
          }
        }
      });

    // $urlRouterProvider.otherwise('/');
  }


})();
