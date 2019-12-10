import { WebWorker } from './../models/web-worker.model';

if (window != self)
    worker_function();

export const WEB_WORKER_URL = URL.createObjectURL(
    new Blob(
        ["(" + worker_function.toString() + ")()"], { type: 'text/javascript' }
    )
)


function worker_function() {
    // all code here
    
    const sendMessage = (message: WebWorker.Message) => {
        (self.postMessage as any)(message);
    }


    const initWebWorker = (event: MessageEvent) => {
        const data: WebWorker.Message = event.data;
        const { action, payload } = data;
        switch (action) {
            case 'SOME_ACTION':
                sendMessage({
                    action,
                    payload
                })
                break;

            default:
                break;
        }

    }



    self.addEventListener('message', initWebWorker);
}