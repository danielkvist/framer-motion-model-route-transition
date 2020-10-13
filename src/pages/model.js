import React, { useState, useEffect } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

import ScrollForMore from '../components/scrollForMore';

// About variants: Target objects are useful for simple, single-component
// animations. But sometimes we want to create animations that propagate
// throughout the DOM, and orchestrate those animations in a declarative
// way. We can do so with variants.
//
// Variants are sets of pre-defined target objects. They're passed
// into motion components via the variants props.
//
// These varians can be referred to by label, wherever you can set
// an animation target.

// Motion Values: MotionValues track the state and velocity of
// animating values. All motion components internally use
// MotionValues to track the state and velocity of an animating
// value.
//
// useTransform creates a MotionValue that transform the output
// of another MotionValue through a function.
//
// useViewportScroll returns MotionValues that update when
// the viewport scrolls.

const firstNameVariant = {
	animate: {
		transition: {
			delayChildren: 0.6,
			staggerChildren: 0.04,
			staggerDirection: -1,
		},
	},
};

const lastNameVariant = {
	animate: {
		transition: {
			delayChildren: 0.6,
			staggerChildren: 0.04,
			staggerDirection: 1,
		},
	},
};

const letter = {
	initial: {
		y: 400,
	},
	animate: {
		y: 0,
		transition: {
			duration: 1,
			delay: 0.2,
		},
	},
};

const Model = ({ imageDetails }) => {
	// don't allow user until image animation is ended
	const [canScroll, setCanScroll] = useState(false);

	// adds scale effect on scroll to image
	const { scrollYProgress } = useViewportScroll();
	const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.15]);

	useEffect(() => {
		if (!canScroll) {
			document.querySelector('body').classList.add('no-scroll');
		} else {
			document.querySelector('body').classList.remove('no-scroll');
		}
	}, [canScroll]);

	return (
		<motion.div
			onAnimationComplete={() => setCanScroll(true)}
			initial="initial"
			animate="animate"
			exit="exit"
			className="single"
		>
			<div className="container">
				<div className="row center top-row">
					<div className="top">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2 }}
							className="details"
						>
							<div className="location">
								<span>28.538336</span>
								<span>-81.379234</span>
							</div>
							<div className="mua">MUA: @mylifeascrystall</div>
						</motion.div>

						<motion.div className="model">
							<motion.span variants={firstNameVariant} className="first">
								<motion.span variants={letter}>Y</motion.span>
								<motion.span variants={letter}>a</motion.span>
								<motion.span variants={letter}>s</motion.span>
								<motion.span variants={letter}>m</motion.span>
								<motion.span variants={letter}>e</motion.span>
								<motion.span variants={letter}>e</motion.span>
								<motion.span variants={letter}>n</motion.span>
							</motion.span>
							<motion.span variants={lastNameVariant} className="last">
								<motion.span variants={letter}>T</motion.span>
								<motion.span variants={letter}>a</motion.span>
								<motion.span variants={letter}>r</motion.span>
								<motion.span variants={letter}>i</motion.span>
								<motion.span variants={letter}>q</motion.span>
							</motion.span>
						</motion.div>
					</div>
				</div>

				<div className="row bottom-row">
					<div className="bottom">
						<div className="image-container-single">
							<motion.div
								initial={{
									y: '-50%',
									width: imageDetails.width,
									height: imageDetails.height,
								}}
								animate={{ y: 0, width: '100%', height: '90vh' }}
								transition={{ delay: 0.2, duration: 1.2 }}
								className="thumbnail-single"
							>
								<div className="frame-single">
									<motion.img
										style={{ scale: scale }}
										initial={{ scale: 1.1 }}
										animate={{
											y: '-12vh',
										}}
										transition={{
											delay: 0.4,
											duration: 1.2,
										}}
										src={require('../images/yasmeen.webp')}
										alt="portrait"
									/>
								</div>
							</motion.div>
						</div>
					</div>
					<ScrollForMore />
				</div>
			</div>
		</motion.div>
	);
};

export default Model;
