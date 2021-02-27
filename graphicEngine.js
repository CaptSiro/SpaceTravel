const canvas = document.querySelector('canvas#cv');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

console.log(canvas.width, canvas.height);


class Calculator {
    relX(x) {
        return (0 - ((canvas.width / 2) - x));
    }
    relY(y) {
        return ((canvas.height / 2) - y);
    }

    calFromRelX(relX) {
        return (canvas.width / 2) + relX;
    }
    calFromRelY(relY) {
        return (canvas.height / 2) - relY;
    }
}


class Star extends Calculator {
    x = Math.random() * (canvas.width - 200) + 100;
    y = Math.random() * (canvas.height - 200) + 100;
    size = Math.random() * 3 + 1;
    multiplier = 1.03;
    isOutSide = false;
    
    update() {
        if ((this.x > -100 && this.x < canvas.width + 100) && (this.y > -100 && this.y < canvas.height + 100)) {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
    
            let relX = super.relX(this.x);
            let relY = super.relY(this.y);
    
            relX *= this.multiplier;
            relY *= this.multiplier;
    
            this.x = super.calFromRelX(relX);
            this.y = super.calFromRelY(relY);
    
            this.multiplier += 0.00001;
        } else {
            if (!this.isOutSide) {
                array.push(new Star());
                this.isOutSide = true;
                if (array.length > 100) {
                    array.shift();
                }
            }
        }
    }
}

let array = [];

for (let i = 0; i < 20; i++) {
    array.push(new Star());
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();

    array.forEach(el => {el.update()})

    requestAnimationFrame(animate);
}

animate();