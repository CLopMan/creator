.data
    mask: .byte 170, 170, 170, 170,
                170, 170, 170, 170,
                170, 170, 170, 170,
                170, 170, 170, 170
.text

main:
    la a0 mask
    vl1re8.v v0 (a0)

    vmseq.vv v1 v6 v7
    vmsne.vv v2 v6 v7
    vmslt.vv  v3 v6 v7
    vmsle.vv  v4 v6 v7
    vmsgt.vv v5 v6 v7
    vmsltu.vv v17 v6 v7
    vmsleu.vv v18 v6 v7
    vmsgtu.vv v20 v6 v7

    vmseq.vv v8 v6 v7 v0.t 
    vmsne.vv v9 v6 v7 v0.t
    vmslt.vv  v10 v6 v7 v0.t
    vmsle.vv  v11 v6 v7 v0.t
    vmsgt.vv v12 v6 v7 v0.t
    vmsltu.vv v17 v6 v7 v0.t
    vmsleu.vv v19 v6 v7 v0.t
    vmsgtu.vv v21 v6 v7 v0.t

    vmseq.vx v13 v6 t0 v0.t
    vmseq.vx v14 v6 t0
    vmsleu.vx v18 v6 t0
    vmsleu.vx v18 v6 t0 v0.t

    vmseq.vi v15 v6 0
    vmseq.vi v15 v6 0 v0.t
    vmsltu.vi v16 v6 8
    vmsltu.vi v16 v6 8 v0.t