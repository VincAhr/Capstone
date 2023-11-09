import "./NavBar.css";

interface BurgerMenuProps {
    isOpen: boolean
}


export default function BurgerMenu(props: BurgerMenuProps) {


    let className = "Burger-Line";
    if(props.isOpen) {
        className += " Burger"
    } else {
        className += " Line"
    }

    return (
        <>
        <div className={"Hamburger-Menu"} >
                <>
                    <div className={className + "1"}/>
                    <div className={className + "2"}/>
                    <div className={className + "3"}/>
                </>
        </div>
        </>
    )
}