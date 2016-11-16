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
  var reflect_help_fun = function(mu_in) {gaussian({mu: mu_in, sigma: 1})}
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
  var observedLuminance = tmp_observe[0];

  var reflectancePosterior = Infer({method: 'MCMC', samples: 10000}, function() {
    var reflectance = gaussian({mu: 1, sigma: 1})
    var illumination = gaussian({mu: 3, sigma: 1})
    var luminance = reflectance * illumination
    observe(Gaussian({mu: luminance, sigma: 1}), observedLuminance)
    return reflectance
  });

  return reflectancePosterior
}

var current_reflect = fun_big_observe([3, 1]);
print(expectation(current_reflect))
viz(current_reflect)
