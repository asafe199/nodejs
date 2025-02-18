class MailDto {
    constructor(from, to, subject, text) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.html = text;
    }

    get toJSON(){
        return {
            from: this.from,
            to: this.to,
            subject: this.subject,
            html: this.html
        };
    }
}

module.exports = MailDto;

