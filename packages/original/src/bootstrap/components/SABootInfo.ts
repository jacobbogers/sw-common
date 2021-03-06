'use strict';

import Base from './Base';
import SALogo from './SALogo';
import SALabel from './SALabel';
import SAProgress from './SAInvertedProgress';

export default class LogoContainer extends Base<HTMLDivElement> {
    private svgLogo: SALogo;
    private logoLabel: SALabel;
    private svgLogoContainer: Base<HTMLDivElement>;
    private progress: SAProgress;



    constructor({ dataAttr = 'bootstrap-inner' }) {
        super({ dataAttr });
        this.svgLogo = new SALogo({});
        this.logoLabel = new SALabel({});
        this.svgLogoContainer = new Base<HTMLDivElement>({ dataAttr: 'logo-container' });
        this.progress = new SAProgress({ text: "loading sw, some Very long text will this be hidden", className: 'progress' });
    }

    createFragment() {
        super.createFragment();

        //"Super-Algos"
        this.logoLabel.createFragment();
        this.progress.createFragment();
        //
        this.svgLogoContainer.createFragment();
        this.svgLogo.createFragment(); //svg

        //wrap progess into a container
        const progressContainer = new Base<HTMLDivElement>({ dataAttr: 'progress-container' });
        progressContainer.createFragment();

        this.svgLogoContainer.append(progressContainer);
        progressContainer.append(this.progress);
        this.svgLogoContainer.append(this.logoLabel);
        this.svgLogoContainer.append(this.svgLogo);

        //finally
        this.append(this.svgLogoContainer);
    }

    // make it more fancy
    render() {
        const svg = this.svgLogo;
        svg.render();
        const s2 = swingBetween(-12,12,0,0.4,true);
        const s3 = swingBetween(-24,24,0,0.6,true);
        setInterval(() => {
            svg.angle1 = svg.angle1 + 0.2;
            svg.angle2 = s2();
            svg.angle3 = s3();
            //svg.angle3 = svg.angle3 + 0.05; //24
            svg.render();
        }, 50);
    }
}

function swingBetween(a: number, b: number, s: number, incr: number, dir: boolean) {
    let cd = dir;
    let c = s;
    return () => {
        c += cd ? incr : -incr;
        if (c < a){
            c +=incr;
            cd = true;
        }
        if (c > b){
            c -= incr;
            cd = false;
        }
        return c;
    };
}



