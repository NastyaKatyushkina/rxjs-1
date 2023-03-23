export default class Message {
  constructor(data) {
    this.from = data?.from;
    this.subject = data?.subject;
    this.date = new Date(data?.received);
    this.message = data?.body;
  }

  render() {
    this.messageEl = document.createElement('li');
    this.messageEl.className = 'chat__message message-chat';

    this.emailEl = document.createElement('a');
    this.emailEl.href = this.from;
    this.emailEl.className = 'message-chat__email';
    this.emailEl.textContent = this.from;

    this.subjectEl = document.createElement('span');
    this.subjectEl.className = 'message-chat__subject';
    this.subjectEl.textContent =
      this.subject.length > 15
        ? `${this.subject.slice(0, 15)}...`
        : this.subject;

    this.dateEl = document.createElement('li');
    this.dateEl.className = 'message-chat__date';
    this.dateEl.textContent = this.formatDate();

    this.messageEl.appendChild(this.emailEl);
    this.messageEl.appendChild(this.subjectEl);
    this.messageEl.appendChild(this.dateEl);
    return this.messageEl;
  }

  formatDate() {
    const day =
      this.date.getDate() < 10
        ? `0${this.date.getDate()}`
        : this.date.getDate();
    const month =
      this.date.getMonth() < 10
        ? `0${this.date.getMonth()}`
        : this.date.getMonth();
    const year = String(this.date.getFullYear()).slice(-2);
    const hour =
      this.date.getHours() < 10
        ? `0${this.date.getHours()}`
        : this.date.getHours();
    const minute =
      this.date.getMinutes() < 10
        ? `0${this.date.getMinutes()}`
        : this.date.getMinutes();
    const formattedDate = `${hour}:${minute} ${day}.${month}.${year}`;

    return formattedDate;
  }
}
