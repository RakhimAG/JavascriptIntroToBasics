
let balance = 1000;

let amountToWithdraw;
let totalWithdrawed = 0;
const WITHDRAW_LIMIT = 2000;

let amountToDeposit;
let totalDeposited = 0;

/* так-как в условии не было уточнено какие именно операции
 (успешные операции || каждый вызов операции),
    Я решил считать только успешные операции.
    Те, которые не были до конца исполнены
    (из-за ошибок пользователя или ограничений), не увеличивали счетчик.
*/
let totalOperations = 0;

const PIN_CODE = "1234";

let isRunning = false;
for (let tries = 1; tries <= 3; tries++ )
{
    if (prompt("Enter your PIN-CODE -> ") === PIN_CODE)
    {
        isRunning = true;
        break;
    }
    
    alert("INVALID! Did you forget your easiest PIN-CODE?");
}
if (!isRunning)
{
    alert("You failed all tries! Your card is blocked now.. Comeback later.");
}

while (isRunning)
{
    alert
    (
        `MAIN MENU :\n
        0 => EXIT\n
        1 => CHECK BALANCE\n
        2 => WITHDRAW\n
        3 => DEPOSIT\n
        4 => CHECK BALANCE IN USD|EUR`
    );

    const userChoice = Number(prompt("Enter your choice -> "));
    switch(userChoice)
    {
        case 0:
        {
            alert
            (
                `STATISTICS :\n
                TOTAL WITHDRAWED : ${totalWithdrawed} AZN;\n
                TOTAL DEPOSITED : ${totalDeposited} AZN;\n
                TOTAL OPERATIONS : ${totalOperations} AZN;\n`
            );
            isRunning = false;
            break;
        }

        case 1:
        {
            alert(`YOUR BALANCE => ${balance} AZN`);
            break;
        }

        case 2:
        {
            amountToWithdraw = Number(prompt("ENTER HOW MUCH TO WITHDRAW -> "));
            if ((amountToWithdraw < 0) || (amountToWithdraw % 5 !== 0))
            {
                alert("INVALID INPUT! WITHDRAW SHOULD BE ABOVE ZERO AND A MULTIPLE OF 5");
                break;
            }      
            
            if (amountToWithdraw <= balance)
            {
                const comission = (amountToWithdraw > 500) ? 0.01 * amountToWithdraw : 0;

                if (balance < amountToWithdraw + comission)
                {
                    alert("OPERATION CANCELLED! NOT ENOUGH BALANCE FOR 1% COMISSION!");
                    break;
                }

                if (totalWithdrawed + amountToWithdraw > WITHDRAW_LIMIT)
                {
                    alert
                    (
                        `YOU HIT THE LIMIT OF ${WITHDRAW_LIMIT} AZN,
                        \nMAX AMOUNT YOU STILL CAN WITHDRAW IS ${(totalWithdrawed > WITHDRAW_LIMIT) ? 0 : WITHDRAW_LIMIT - totalWithdrawed} AZN`
                    );
                    break;
                }

                
                balance -= (amountToWithdraw + comission);
                alert("WITHDRAWED SUCCESSFULLY");
                
                totalWithdrawed += amountToWithdraw;
                totalOperations++;
                
                break;
            }
            
            alert("YOU CAN'T WITHDRAW MORE THAN YOUR BALANCE! OPERATION CANCELLED!");
            break;
        }

        case 3:
        {
            amountToDeposit = Number(prompt("ENTER HOW MUCH TO DEPOSIT -> "));
            if ((amountToDeposit < 0) || (amountToDeposit % 5 !== 0))
            {
                alert("INVALID INPUT! DEPOSIT SHOULD BE ABOVE ZERO AND A MULTIPLE OF 5");
                break;
            }
            
            balance += amountToDeposit;
            alert("DEPOSITED SUCCESSFULLY!")

            totalDeposited += amountToDeposit;
            totalOperations++;

            break;
        }

        case 4:
        {
            const USD_CURRENCY = 1.7;
            const EUR_CURRENCY = 1.9148;

            alert(`YOU BALANCE -> ${(balance / USD_CURRENCY).toFixed(2)} USD | ${(balance / EUR_CURRENCY).toFixed(2)} EUR`)
            break;
        }

        default:
            alert("ERROR! There is no such option in MAIN MENU..");
    }
}