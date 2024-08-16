import { useFrame, useThree } from '@react-three/fiber';
import { Boolean3Tuple, RapierRigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useGame } from '../../common/GameManager';
import { useUpdate } from '../../common/utils/useUpdate';

const CAMERA_OFFSET_Y = 0; // Adjust this value to change how far above the player the camera should be
const CAMERA_OFFSET_X = 0;
const CAMERA_OFFSET_Z = 5;
const CAMERA_LERP_FACTOR = 0.1; // Adjust this to change how quickly the camera follows the player

const initialCameraPos : Vector3 = new Vector3(0, 0, 0)

const FollowCamera = ({targetPos, enabledTranslations = [true, true, true]} : {targetPos: Vector3, enabledTranslations: Boolean3Tuple}) => {
    const { camera } = useThree();
    const cameraPosition = useRef<Vector3>(initialCameraPos);

    useUpdate(() => {
        if (!targetPos) return;

        // Calculate the target camera position
        const targetPosition = new Vector3(
            enabledTranslations[0] ? targetPos.x + CAMERA_OFFSET_X : initialCameraPos.x,
            enabledTranslations[1] ? targetPos.y + CAMERA_OFFSET_Y : initialCameraPos.y,
            enabledTranslations[2] ? targetPos.z + CAMERA_OFFSET_Z : initialCameraPos.z
        );

        // Smoothly interpolate the camera position
        cameraPosition.current.lerp(targetPosition, CAMERA_LERP_FACTOR);
        camera.position.copy(cameraPosition.current);
    });

    return null
};

export default FollowCamera;