import { ChromeStorage } from '../core';


new ChromeStorage().get().then(data => {
    console.log(data);
})