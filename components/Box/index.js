import { useFrame } from '@react-three/fiber'
import { useState, useRef } from "react"

export default function Box(props) {
    const [active, setActive] = useState(false);
    const mesh = useRef();

    useFrame((state, delta) => {
        mesh.current.rotation.y += delta;
    });

    return(
        <mesh 
            position = {[0.1,1,0]}
            ref = {mesh}
            {...props}
            scale = {active ? 1.5 : 1}
            onClick= {(event) => setActive(!active)}
        >
            <boxGeometry/>
            <meshStandardMaterial color = {active ? 'green' : 'yellow'}/>
        </mesh>
    )
}