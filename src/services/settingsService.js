const setLang2 = function(val) {
    let locales = {
        en: {
            message: {
                hello: 'hello world'
            },
            auth: {
                login: 'Login',
                login_action: 'ارسال',
                login_intor_message: 'سجل دخول هنا',
                register: 'تسجيل جديد',
                forget_password: 'نسيت كلمه السر!',
                register_intro_message: 'انضم الينا',
            },
            el: {
                datepicker: {
                    now: 'Now',
                    today: 'Today',
                    cancel: 'Cancel',
                    clear: 'Clear',
                    confirm: 'OK',
                    selectDate: 'Select date',
                    selectTime: 'Select time',
                    startDate: 'Start Date',
                    startTime: 'Start Time',
                    endDate: 'End Date',
                    endTime: 'End Time',
                    year: '',
                    month1: 'January',
                    month2: 'February',
                    month3: 'March',
                    month4: 'April',
                    month5: 'May',
                    month6: 'June',
                    month7: 'July',
                    month8: 'August',
                    month9: 'September',
                    month10: 'October',
                    month11: 'November',
                    month12: 'December',
                    // week: 'week',
                    weeks: {
                        sun: 'Sun',
                        mon: 'Mon',
                        tue: 'Tue',
                        wed: 'Wed',
                        thu: 'Thu',
                        fri: 'Fri',
                        sat: 'Sat'
                    },
                    months: {
                        jan: 'Jan',
                        feb: 'Feb',
                        mar: 'Mar',
                        apr: 'Apr',
                        may: 'May',
                        jun: 'Jun',
                        jul: 'Jul',
                        aug: 'Aug',
                        sep: 'Sep',
                        oct: 'Oct',
                        nov: 'Nov',
                        dec: 'Dec'
                    }
                },
                select: {
                    loading: 'Loading',
                    noMatch: 'No matching data',
                    noData: 'No data',
                    placeholder: 'Select'
                },
                pagination: {
                    goto: 'Go to',
                    pagesize: '/page',
                    total: 'Total {total}',
                    pageClassifier: ''
                },
                messagebox: {
                    title: 'Message',
                    confirm: 'OK',
                    cancel: 'Cancel',
                    error: 'Illegal input'
                },
                upload: {
                    delete: 'Delete',
                    preview: 'Preview',
                    continue: 'Continue'
                },
                table: {
                    emptyText: 'No Data',
                    confirmFilter: 'Confirm',
                    resetFilter: 'Reset',
                    clearFilter: 'All'
                },
                tree: {
                    emptyText: 'No Data'
                }
            }

        },

        ar: {
            message: {
                hello: 'يا هلا ياهلا'
            },
            auth: {
                login: 'تسجيل الدخول',
                login_action: 'send',
                login_intor_message: 'سجل دخول هنا',
                register: 'تسجيل جديد',
                forget_password: 'نسيت كلمه السر!',
                register_intro_message: 'انضم الينا',
            },
        },

    }

    Vue.config.lang = 'en'
        // // // set locales
    Object.keys(locales).forEach(function(lang) {
        Vue.locale(lang, locales[lang])

    })
}



const setLang = function(val) {
    var self = this
    var lang = 'ar'
    Vue.locale(lang, function() {
        self.loading = true
        return fetch('_k/language/' + lang, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function(res) {
            return res.json()
        }).then(function(json) {
            self.loading = false
            if (Object.keys(json).length === 0) {
                return Promise.reject(new Error('locale empty !!'))
            } else {
                return Promise.resolve(json)
            }
        }).catch(function(error) {
            self.error = error.message
            return Promise.reject()
        })
    }, function() {
        Vue.config.lang = lang
    })
}

const getMeta = function() {

}
const changeLang = function(lang) {
    Vue.config.lang = lang
    $('html').attr('lang', lang)


}
const changeColor = function(color) {

    $('body').attr('class', color)


}


export default {
    setLang,
    getMeta,
    changeLang,
    changeColor
}
