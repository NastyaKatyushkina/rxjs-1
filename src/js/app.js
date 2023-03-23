import Message from './components/Message';
import { ajax } from 'rxjs/ajax';
import { EMPTY, map, catchError, of, switchMap, interval, tap } from 'rxjs';

window.onload = () => {
  const chat = document.getElementById('chat');

  const intervalStream$ = interval(5000).pipe(
    tap((v) => console.log(v)),
    switchMap((v) => {
      return ajax.getJSON('http://localhost:7070/messages/unread').pipe(
        catchError((error) => {
          console.log('error: ', error.message);
          return EMPTY;
        })
      );
    }),
    map((response) => {
      console.log(response);
      return response.messages;
    })
  );

  intervalStream$.subscribe({
    next: (messages) => {
      if (Array.isArray(messages) && messages.length > 0) {
        messages.forEach((message) => {
          chat.prepend(new Message(message).render());
        });
      }
    },
    error: (err) => console.log('err', err),
  });
};
