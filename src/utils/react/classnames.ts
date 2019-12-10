type ClassName = string | { [className: string]: boolean };

export default function classNames(...classes: Array<ClassName>) {
    return classes.reduce<string>((pervious, current) => {
        if (typeof current === 'object') {
            Object.keys(current).forEach((key: string) => {
                const shouldAdd = current[key];
                if (shouldAdd) {
                    pervious += ` ${key}`
                }
            })
        }

        if (typeof current === 'string') {
            pervious += ` ${current}`
        }

        return pervious.trim();
    }, '')
}