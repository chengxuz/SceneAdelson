/*
var observedLuminance = 3;

var reflectancePosterior = Infer({method: 'MCMC', samples: 10000}, function() {
  var reflectance = gaussian({mu: 1, sigma: 1});
  var illumination = gaussian({mu: 3, sigma: 1});
  var luminance = reflectance * illumination;
  observe(Gaussian({mu: luminance, sigma: 1}), observedLuminance);
  return reflectance;
});
*/
//expectation(reflectancePosterior);
//console.log(expectation(reflectancePosterior));

//var observedLuminance_list = [100, 100, 100, 230, 230, 230, 100, 165, 100, 230, 165, 230, 100, 100, 100, 230, 230, 230]/100;
//var observedLuminance_list = [100, 100, 100, 230, 230, 230, 100, 165, 100, 230, 165, 230, 100, 100, 100, 230, 230, 230];
var observedLuminance_list = [1, 2];

var reflectancePosterior = Infer({method: 'MCMC', samples: 10000}, function() {
  var reflect_help_fun = function(mu_in) {return gaussian({mu: mu_in, sigma: 1})}
  var reflectance = map(reflect_help_fun, observedLuminance_list);
  var illumination = gaussian({mu: 3, sigma: 1});
  var luminance = reflectance * illumination;
  //observe(Gaussian({mu: luminance, sigma: 1}), observedLuminance);
  return reflectance;
});

//var test_var = observedLuminance_list[0]
console.log(observedLuminance_list[0])
console.log(expectation(reflectancePosterior));


var fun_big_observe = function(tmp_observe) {
  var observedLuminance1 = tmp_observe[0];
  var observedLuminance2 = tmp_observe[1];

  var reflectancePosterior = Infer({method: 'MCMC', samples: 10000}, function() {
    //var reflectance1 = gaussian({mu: 1, sigma: 1})
    //var reflectance2 = gaussian({mu: 1, sigma: 1})
    //var reflect_list = [gaussian({mu: 1, sigma: 1}), gaussian({mu: 1, sigma: 1})]
    var reflect_help_fun =  function() {return gaussian({mu: 1, sigma: 1})}
    var reflect_list = repeat(2, reflect_help_fun)
    var illumination = gaussian({mu: 3, sigma: 1})
    //var luminance1 = reflectance1 * illumination
    //var luminance2 = reflectance2 * illumination
    var lumin_list = map(function(reflect_now){return reflect_now * illumination}, reflect_list)
    //var obs_help_func = function (list_lu_ob){observe(Gaussian({mu: list_lu_ob[0], sigma: 1}), list_lu_ob[1])}
    //obs_help_func([lumin_list[0], tmp_observe[0]])
    //obs_help_func([lumin_list[1], tmp_observe[1]])
    //observe(Gaussian({mu: luminance1, sigma: 1}), observedLuminance1)
    //observe(Gaussian({mu: luminance2, sigma: 1}), observedLuminance2)
    //obs_help_func([luminance1, observedLuminance1])
    //obs_help_func([luminance2, observedLuminance2])
    //return [reflectance1, reflectance2]
    //return reflectance1

    var obs_help_func = function (indx_need){observe(Gaussian({mu: lumin_list[indx_need], sigma: 1}), tmp_observe[indx_need])}
    map(obs_help_func, _.range(2))

    return reflect_list[1]
  });

  return reflectancePosterior
}

//var test_array = repeat(3, flip)
//console.log(test_array)

var current_reflect = fun_big_observe([3, 1]);
//print(expectation(current_reflect))
console.log(expectation(current_reflect))
console.log(_.range(5))
//viz(current_reflect)
