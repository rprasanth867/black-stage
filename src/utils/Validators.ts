
export class Validator {
    static URL = (rule:any, value:any, callback:any) => {
        if (value && !/^https?:\/\//i.test(value)) {
          callback('Please enter a valid URL');
        } else {
          callback();
        }
    };
}
