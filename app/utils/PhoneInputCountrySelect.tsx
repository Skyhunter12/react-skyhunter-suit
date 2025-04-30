import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

const LETTER_REGEXP = new RegExp(/\p{Letter}/u);

const PhoneInputCountrySelect = ({ options, labels, value, onChange, ...rest }:any) => {
    const [optionIsOpen, setOptionIsOpen] = useState(false);
    const searchRef = useRef('');
    const itemsRef = useRef<Map<any, any> | null>(null);

    const scrollToId = (itemId:any) => {
        const map = getMap();
        const node = map.get(itemId);
        if (!node) return;
        node.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'center'
        });
    };

    const getMap = () => {
        if (!itemsRef.current) {
            itemsRef.current = new Map();
        }
        return itemsRef.current || new Map();
    };

    const onKeydown = (e: { key: string; }) => {
        if (e.key === 'Backspace') {
            searchRef.current = searchRef.current.slice(0, -1);
            let id = findId();
            !!id && scrollToId(id);
        }
    };
    const onKeypress = (e: { key: string; }) => {
        if (LETTER_REGEXP.test(e.key.toLowerCase())) {
            searchRef.current = searchRef.current + e.key.toLowerCase();
        }
        let id = findId();
        !!id && scrollToId(id);
    };

    const findId = () => {
        let RegExpId = new RegExp(`^${searchRef.current}`, 'i');
        let el = options.find((opt: { label: string; }) => {
            return RegExpId.test(opt.label);
        });
        return el?.label;
    };

    useEffect(() => {
        searchRef.current = '';
    }, [optionIsOpen]);

    useEffect(() => {
        if (optionIsOpen) {
            window.addEventListener('keypress', onKeypress);
            window.addEventListener('keydown', onKeydown);
        } else {
            window.removeEventListener('keypress', onKeypress);
            window.removeEventListener('keydown', onKeydown);
        }
        return () => {
            window.removeEventListener('keypress', onKeypress);
            window.removeEventListener('keydown', onKeydown);
        };
    }, [optionIsOpen]);

    const chooseOptionHandler = (option: any) => {
        if (!option) return;
        onChange(option);
        setOptionIsOpen(false);
    };
    return (
        <div
            className={[
                'PhoneInputComponent__select-wrapper',
                optionIsOpen ? 'PhoneInputComponent__select-wrapper--open' : null
            ].join(' ')}
            onClick={() => setOptionIsOpen(!optionIsOpen)}>
            <div className="PhoneInputComponent__img-wrapper">
                {value ? (
                    <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value}.svg`} />
                ) : (
                    <svg className="PhoneInputCountryIconImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 50">
                        <title>International</title>
                        <g stroke="currentColor" fill="none" strokeWidth="2" strokeMiterlimit="10">
                            <path strokeLinecap="round" d="M47.2,36.1C48.1,36,49,36,50,36c7.4,0,14,1.7,18.5,4.3"></path>
                            <path d="M68.6,9.6C64.2,12.3,57.5,14,50,14c-7.4,0-14-1.7-18.5-4.3"></path>
                            <line x1="26" y1="25" x2="74" y2="25"></line>
                            <line x1="50" y1="1" x2="50" y2="49"></line>
                            <path
                                strokeLinecap="round"
                                d="M46.3,48.7c1.2,0.2,2.5,0.3,3.7,0.3c13.3,0,24-10.7,24-24S63.3,1,50,1S26,11.7,26,25c0,2,0.3,3.9,0.7,5.8"></path>
                            <path
                                strokeLinecap="round"
                                d="M46.8,48.2c1,0.6,2.1,0.8,3.2,0.8c6.6,0,12-10.7,12-24S56.6,1,50,1S38,11.7,38,25c0,1.4,0.1,2.7,0.2,4c0,0.1,0,0.2,0,0.2"></path>
                        </g>
                        <path
                            className="PhoneInputInternationalIconPhone"
                            stroke="none"
                            fill="currentColor"
                            d="M12.4,17.9c2.9-2.9,5.4-4.8,0.3-11.2S4.1,5.2,1.3,8.1C-2,11.4,1.1,23.5,13.1,35.6s24.3,15.2,27.5,11.9c2.8-2.8,7.8-6.3,1.4-11.5s-8.3-2.6-11.2,0.3c-2,2-7.2-2.2-11.7-6.7S10.4,19.9,12.4,17.9z"></path>
                    </svg>
                )}
            </div>
            <div className="Select__below" style={{ display: !optionIsOpen ? 'none' : undefined }}>
                <ul className="Select__list">
                    {options.map(({ label, value }: any, index: string) => (
                        <li
                            key={'option-' + value + '-' + index}
                            ref={(node) => {
                                const map = getMap();
                                if (node) {
                                    map.set(label, node);
                                } else {
                                    map.delete(label);
                                }
                            }}
                            className="Select__item"
                            onClick={() => chooseOptionHandler(value)}>
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PhoneInputCountrySelect;

PhoneInputCountrySelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    labels: PropTypes.objectOf(PropTypes.string).isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string
        })
    )
};