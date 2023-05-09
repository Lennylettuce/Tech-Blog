module.exports = {
    format_date: date => {
        return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`;
    },

}

//Use javascript date obj with methods to format the date