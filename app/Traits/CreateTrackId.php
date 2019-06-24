<?php

namespace App\Traits;

use App\Ticket;

trait CreateTrackId {
    protected $alpha = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';
    /* Three letter words from:
    https://github.com/klhurley/ElementalEngine2/blob/master/Common/Databases/BadWords.dbx
    */
    protected $filterWords = [
        'BJ', 'ASS', 'FUC', 'FUK', 'FUQ', 'FUC', 'COC', 'COK', 'KOC', 'KOK', 'KOQ', 'CAC', 'CAK', 'CAQ', 'KAC', 'KAK', 'KAQ', 'DIC',
        'DIK', 'DIQ', 'DIX', 'DCK', 'PNS', 'PSY', 'FAG', 'FGT', 'NGR', 'NIG', 'CNT', 'KNT', 'SHT', 'DSH', 'TWT', 'BCH', 'CUM', 'CLT',
        'KUM', 'KLT', 'SUC', 'SUK', 'SUQ', 'SCK', 'LIC', 'LIQ', 'LIK', 'JIZ', 'JZZ', 'GAY', 'GEI', 'GAI', 'VAG', 'VNG', 'SVJ', 'FAP',
        'PRN', 'LOL', 'JEW', 'JOO', 'GVR', 'PUS', 'PIS', 'PSS', 'SNM', 'TIT', 'FKU', 'FCU', 'FQU', 'HOR', 'SLT', 'JAP', 'WOP', 'KIK',
        'KYK', 'KYC', 'KYQ', 'KYK', 'KYC', 'KYQ', 'DYK', 'DYQ', 'DYC', 'KKK', 'JYZ', 'PRK', 'PRC', 'PRQ', 'MIC', 'MIK', 'MIQ', 'MYC',
        'MYK', 'MYQ', 'GUC', 'GUK', 'GUQ', 'GIZ', 'GZZ', 'SEX', 'SXX', 'SXI', 'SXE', 'SXY', 'XXX', 'WAC', 'WAK', 'WAQ', 'WCK', 'POT',
        'THC', 'VJN', 'NUT', 'STD', 'STI', 'LSD', 'POO', 'AZN', 'PCP', 'DMN', 'ORL', 'ANL', 'ANS', 'MUF', 'MFF', 'PHK', 'PHC', 'PHQ',
        'SAQ', 'PMS', 'NAD', 'NDZ', 'NDS', 'WTF', 'SOL', 'SOB', 'FOB', 'STF'
    ];

    protected function generateTrackId()
    {
        do {
            $temp = [];
            $temp[0] = random_int(0, 9);
            $temp[0] .= random_int(0, 9);
            $temp[0] .= random_int(0, 9);
            $temp[0] .= random_int(0, 9);

            $temp[1] = $this->alpha[random_int(0, 24)];
            $temp[1] .= $this->alpha[random_int(0, 24)];
            $temp[1] .= $this->alpha[random_int(0, 24)];

            $safe = random_int(0, 9);
            $safe .= $this->alpha[random_int(0, 24)];
            $safe .= random_int(0, 9);
            $temp[1] = str_replace($this->filterWords, $safe, $temp[1]);


            $temp[2] = random_int(0, 9);
            $temp[2] .= random_int(0, 9);
            $temp[2] .= random_int(0, 9);

            $trackId = $temp[0] . '-' . $temp[1] . '-' . $temp[2];

            if (Ticket::where('track_id', $trackId)->get()->isNotEmpty()) {
                $trackId = null;
            }
        } while ($trackId === null);

        return $trackId;
    }
}
