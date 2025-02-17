class MailDto {
    constructor(from, to, subject, text) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
    }

    get toJSON(){
        return {
            from: this.from,
            to: this.to,
            subject: this.subject,
            text: this.text
        };
    }
}

module.exports = MailDto;

