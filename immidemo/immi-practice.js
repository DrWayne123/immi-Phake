

// Đối tượng Validator

function validator(options) {
    
    var $ = document.querySelector.bind(document);
    var $$ = document.querySelectorAll.bind(document);

    var inputElYes= $$('.form-control');
    var addBtn = $('.details-box__btn');
    var cancelBtn = $('.page-5-2 .col:first-child a');
    var modal = $('.modal');

    var aBtn = document.querySelector('.a-btn');
    
    // Xử lý show hidden infor
    function showInfor(e, infor) {
        if(e.target.value === 'yes') {
            infor.classList.remove('disable')
        } else {
            infor.classList.add('disable')
        }
    }

    // Xử lý khi thẻ cha Form-group bị lồng vào nhiều thẻ div 
    function getParentElement(element, selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement
        }
    }

    
    var selectorRules = {};
    
    // Xử lý form Validate.
    function validate(inputEl, rule) {
        
        var errElement = getParentElement(inputEl, options.formGroupSelector).querySelector(options.formMessage);
        var errMsg;

        // Xử lý lặp qua các rules khi 1 input được áp dụng nhiều rules
        var rules = selectorRules[rule.selector];

        for(var i = 0; i < rules.length; ++i) {
          switch(inputEl.type) {
              case 'radio': 
              case 'checkbox':
                  errMsg = rules[i](formEl.querySelector(`${rule.selector}:checked`))
                  break;
              default:
                  errMsg = rules[i](inputEl.value)
          }
            if(errMsg) break;
        };


        // Xử lý báo lỗi và dừng báo lỗi khi người dùng bắt đầu nhập
        if(errMsg) {
            errElement.innerHTML = errMsg;
            getParentElement(inputEl, options.formGroupSelector).classList.add('invalid');
        } else {
            errElement.innerHTML = '';
            getParentElement(inputEl, options.formGroupSelector).classList.remove('invalid');
        };

        return !errMsg;
    }

    // Xử lý các sự kiện của các rule trong form nhất định.
    var formEl = document.querySelector(options.form);

    if (formEl) {
        formEl.onsubmit = function(e) {
            // Xử lý chặn sự kiện kết nối với trang web khác của form.
            e.preventDefault();
            
            var isFormValid = true;
            // Xử lý lặp qua từng rule để validate
            options.rules.forEach(function(rule) {
                var inputEl = formEl.querySelector(rule.selector);
                var isValid = validate(inputEl, rule);

                if(!isValid) {
                    isFormValid = false;
                }
            });


            if(isFormValid) {
                if(typeof options.onSubmit === 'function') {
                    aBtn.click();
                    options.onSubmit();
                };

                var editBtn = $('.details-box__bar.get-infor .col:last-child li:first-child');
                editBtn.onclick = function() {
                    console.log('asd')
                    modal.classList.remove('disable');
                    if(typeof options.changeSave === 'function') {
                        options.changeSave();
                    }
                };
            }


        };
            //  Xử lý tick chọn
        Array.from(inputElYes).forEach(function(input) {
            input.onclick = function(e) {

                if(e.target.name === 'prv-ok') {
                    const infor = $('.page-5');
                    showInfor(e, infor);
                }

                if(e.target.name === 'prv-pp') {
                    const infor = $('.page-5-1');
                    showInfor(e, infor);
                }

                if(e.target.name === 'visa-g') {
                    const infor = $('.visa-grant');
                    showInfor(e, infor);
                }
            }
        })

            addBtn.onclick = function() {
                modal.classList.remove('disable');
            }
   
            cancelBtn.onclick = function() {
                modal.classList.add('disable');
            }
   
        
        options.rules.forEach(function(rule) {
            
            // Xử lý đưa các thêm các rules vào cũng 1 mảng để duyệt
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
              } else {
                  selectorRules[rule.selector] = [rule.test]
              };
              
          var inputEls = formEl.querySelectorAll(rule.selector);
              
          Array.from(inputEls).forEach(function(inputEl) {
              inputEl.onblur = function() {
                  validate(inputEl, rule)
              };
  
              // Xử lý khi nhập 
              inputEl.oninput = function() {
                  var errElement = getParentElement(inputEl, options.formGroupSelector).querySelector(options.formMessage);
                  errElement.innerHTML = '';
                  getParentElement(inputEl, options.formGroupSelector).classList.remove('invalid');
              };
          });
         // Xử lý khi blur
        })
    }
};


// Logic của các Rules:
validator.isRequire = function (selector, message) {
    return {
        selector,
        test: function(value) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        }
    }
};


validator.isEmail = function (selector, message) {
    return {
        selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này nhập Email'
        }
    }
};


validator.isPassword = function (selector, min, message) {
    return {
        selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Trường này phải nhập tối thiểu ${min} ký tự`;
        }
    }
};

validator.isPasswordConfirmed = function (selector, getConfirmPassword, message) {
  return {
    selector,
    test: function(value) {
        return value === getConfirmPassword() ? undefined : message || 'Giá trị nhập không giống nhau';
        }
    }
};









// 













// 







// aksjfhlashg





























































