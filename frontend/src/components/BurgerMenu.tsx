import "./NavBar.css";

interface BurgerMenuProps {
    isOpen: boolean
}

export default function BurgerMenu(props: BurgerMenuProps) {


    let className = "burger-line";
    if(props.isOpen) {
        className += " burger"
    } else {
        className += " line"
    }

    return (
        <>
        <div className={"hamburger-menu"} >
                <>
                    <div className={className + "1"}/>
                    <div className={className + "2"}/>
                    <div className={className + "3"}/>
                </>
        </div>
        </>
    )
}